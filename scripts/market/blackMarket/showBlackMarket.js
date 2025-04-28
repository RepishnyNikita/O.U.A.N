import { game } from "../../variables-game.js";
import buyItem from "../buyItem.js";
import { addToLog } from "../../utils.js";
import updateInventory from "../../updateInventory.js";
import { updateMoneyUI } from "../../updatesUI.js";
import { items } from "../../items.js";


// Черный рынок
export default function showBlackMarket() {
  addToLog("Вы вошли на черный рынок:", "market");
  document.querySelector("[data-js-black-market]").style.display = "grid";
  document.querySelector("[data-js-black-market-money]").textContent =
    game.economy.money;

  const itemsList = document.querySelector("[data-js-black-market-list]"); // Нахходим наш контейнер
  itemsList.innerHTML = "";

  // Добавляем товары
  for (const item in game.marketModifiers) {
    const row = document.createElement("li");
    row.className = "black-market-item";
    //
    const iconItem = document.createElement("img");
    iconItem.src = items[item].icon;
    row.appendChild(iconItem);
    //
    const priceItem = document.createElement("span");
    const price = game.marketModifiers[item].currentPrice;
    const basePrice = game.marketModifiers[item].basePrice;
    priceItem.textContent = `$${price}`; //Добавили цену спану

    // Добавляем класс в зависимости от изменения цены
    if (price > basePrice) {
      priceItem.className = "black-market-price-down";
    } else if (price < basePrice) {
      priceItem.className = "black-market-price-up";
    }
    row.appendChild(priceItem); //Добавили спан c ценой
    //

    const buyButton = document.createElement("button");
    buyButton.className = "black-market-bue";
    buyButton.textContent = "Купить";

    buyButton.onclick = (function (itemName, itemPrice) {
      return function () {
        buyItem(itemName, itemPrice);
      };
    })(item, game.marketModifiers[item].currentPrice); //! Заменить

    if (game.inventory.length >= game.inventorySlots) {
      buyButton.disabled = true;
      buyButton.title = "Инвентарь полон";
    } else if (game.economy.money < game.marketModifiers[item].currentPrice) {
      buyButton.style.opacity = "0.5";
      buyButton.title = "Недостаточно денег";
    }

    row.appendChild(buyButton);
    itemsList.appendChild(row);
  }

  // Добавляем слот инвентаря в продажу
  const row = document.createElement("li");
  row.className = "black-market-item";
  const nameItem = document.createElement("span");
  nameItem.textContent = "+1 слот инвентаря";
  row.appendChild(nameItem);

  const priceItem = document.createElement("span");
  priceItem.textContent = "$2000";
  row.appendChild(priceItem);

  const buyButton = document.createElement("button");
  buyButton.className = "black-market-bue";
  buyButton.textContent = "Купить";
  buyButton.onclick = function () {
    if (game.inventorySlots >= 10) {
      addToLog("Максимальный размер инвентаря (10 слотов)!", "danger");
      return;
    }

    if (game.economy.money >= 2000) {
      game.economy.money -= 2000;
      game.inventorySlots += 1;
      addToLog(
        "+1 слот инвентаря! Теперь у вас " + game.inventorySlots + " слотов.",
        "success"
      );
      updateMoneyUI();
      updateInventory();
      document.querySelector("[data-js-black-market]").style.display = "none"; //! Нужно ли - закрывашка модалки
    } else {
      addToLog("Недостаточно денег!", "no-money");
    }
  };

  if (game.inventorySlots >= 10) {
    buyButton.disabled = true;
    buyButton.title = "Максимальный размер инвентаря";
  } else if (game.economy.money < 2000) {
    buyButton.style.opacity = "0.5";
    buyButton.title = "Недостаточно денег";
  }

  row.appendChild(buyButton);
  itemsList.appendChild(row);
}

// Инициализация черного рынка
document
  .querySelector("[data-js-black-market-close-btn]")
  .addEventListener("click", function () {
    addToLog("Вы покинули черный рынок:", "exit");
    document.querySelector("[data-js-black-market]").style.display = "none";
  });

document
  .querySelector("[data-js-black-market-btn]")
  .addEventListener("click", showBlackMarket);
