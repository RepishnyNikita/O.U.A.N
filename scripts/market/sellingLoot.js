import { game } from "../variables-game.js";
import { addToLog } from "../utils.js";
import { items } from "../items.js";
import sellItem from "./sellItem.js";

// Меню продажи добычи
export default function sellingLoot() {
  addToLog("Вы решили избавится от барахла что нашли:", "market");
  document.querySelector("[data-js-sell-market]").style.display = "grid";
  document.querySelector("[data-js-sell-market-money]").textContent = game.economy.money;
  
  const itemsList = document.querySelector("[data-js-sell-market-list]"); // Нахходим наш контейнер
  itemsList.innerHTML = "";

  const sellableItems = game.inventory.filter(
    (item) => items[item].type !== "tool"
  ); 
  
  if (sellableItems.length === 0) {
    addToLog("Нет предметов для продажи!", "danger");
    return;
  }

  // Добавляем товары
  sellableItems.forEach((item) => {
    for (const itemMod in game.sellMarketModifiers) {
      if (item === itemMod) {
        const row = document.createElement("li");
        row.className = "black-market-item";
        const iconItem = document.createElement("img");
        iconItem.src = items[item].icon
        row.appendChild(iconItem);

        const priceItem = document.createElement("span");
        const price = game.sellMarketModifiers[itemMod].currentPrice;
        const basePrice = game.sellMarketModifiers[itemMod].basePrice;
        priceItem.textContent = `$${price}`; //Добавили цену спану
        row.appendChild(priceItem); //Добавили спан c ценой

        if (price > basePrice) {
          priceItem.className = "black-market-price-up";
        } else if (price < basePrice) {
          priceItem.className = "black-market-price-down";
        }

        const buyButton = document.createElement("button");
        buyButton.className = "black-market-bue";
        buyButton.textContent = "Продать";

        buyButton.addEventListener(
          "click",
          () => {
            sellItem(itemMod, game.sellMarketModifiers[itemMod].currentPrice);
          },
          { once: true }
        );

        row.appendChild(buyButton);
        itemsList.appendChild(row);
      }
    }
  });
}
