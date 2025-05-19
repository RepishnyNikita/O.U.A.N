import { ICON } from "../assets.js";
import { containerElements } from "../dom-elements.js";
import { items } from "../items.js";
import { updateEnergyUI, updateMoneyUI } from "../updatesUI.js";
import { addAction } from "../utils.js";
import { game } from "../variables-game.js";
import buyItem, { buySlot } from "./buyItem.js";
import sellItem, { sellAllItems } from "./sellItem.js";

const titleContainer = document.querySelector("[data-js-market-title]");
const money = document.querySelector("[data-js-market-money]");
const listContainer = document.querySelector("[data-js-market-list]");
const controlsContainer = document.querySelector("[data-js-market-controls]");
const inventoryContainer = document.querySelector("[data-js-market-inventory]");


export default function market(action) {
  //! ПЕРЕПИСАТЬ Всё на переменную
  if(!action){
    if(game.market.sell){
      action = 'sell'
    }else if(game.market.buy){
      action = 'buy'
    }
  }

  containerElements.market.showModal();
  containerElements.market.classList.add("is-open");
  controlsContainer.innerHTML = "";

  titleContainer.innerHTML = `
        <img src=${
          action === "sell" ? ICON.MAN2 : ICON.MAN3
        } width="20" height="20">
        <span>${
          action === "sell"
            ? "Вы у скупщика краденного"
            : "Вы у снабженца инструментом"
        }</span>
    `;
  money.textContent = game.economy.money; //? функция?

  const summ = (game.energy.maxEnergy - game.energy.currentEnergy) * 100;
  const remainder = (game.economy.money / 100) * 100;

  if (action === "sell") {

    addAction(
      controlsContainer,
      "Продать весь лут",
      sellAllItems,
      "market__btn",
      ICON.SELL
    );
  } else {
    addAction(
      controlsContainer,
      `Восполнить недостоющую энергию за $${
        game.economy.money > summ ? summ : remainder
      }`,
      replenishEnergy,
      "market__btn",
      ICON.ENERGY
    );
  }

  if (
    action !== "sell" &&
    game.inventory.backpackSlots !== game.inventory.maxBackpackSlots
  ) {
    addAction(
      controlsContainer,
      "Cлот инвентаря +1 за $2000",
      buySlot,
      "market__btn",
      ICON.INVENTORY
    );
  }

  addAction(
    controlsContainer,
    `${action === "sell" ? "Покинуть скупщика" : "Покинуть снабженца"}`,
    () => {
      containerElements.market.close();
      containerElements.market.classList.remove("is-open");
      listContainer.classList.remove("empty");
    },
    "market__btn",
    ICON.BACK
  );

  containerElements.market.addEventListener("close", () => {
    containerElements.market.classList.remove("is-open");
  });

  createElementItems(action);
  updateInventoryInMarket();
}

function replenishEnergy() {
  const priceEnergy = 100;
  if (game.economy.money <= 0) return;

  const summ =
    (game.energy.maxEnergy - game.energy.currentEnergy) * priceEnergy;
  const remainder = (game.economy.money / priceEnergy) * priceEnergy;

  if (game.economy.money > summ) {
    game.economy.money -= summ;
    game.energy.currentEnergy = game.energy.maxEnergy;
    updateEnergyUI();
    updateMoneyUI();
  } else if (game.economy.money >= remainder) {
    game.economy.money -= remainder;
    game.energy.currentEnergy += remainder / priceEnergy;
    updateMoneyUI();
    updateEnergyUI();
  }
  market("buy");
}

function updateInventoryInMarket() {
  inventoryContainer.innerHTML = "";

  if (game.inventory.backpack.length === 0) {
    inventoryContainer.style.display = "flex";
    inventoryContainer.innerHTML = "Пустой инвентарь";
  } 

  game.inventory.backpack.forEach((item) => {
    const img = document.createElement("img");
    img.style.width = "30px";
    img.src = items[item].icon;
    inventoryContainer.appendChild(img);
  });

}

function createElementItems(action) {
  listContainer.innerHTML = "";
  let categories =
    action === "sell" ? game.market.loot : game.market.consumable;
  
  if(action === "sell"){
      game.market.sell = true
      game.market.buy = false
  }else{
    game.market.sell = false
    game.market.buy = true
  }

  const className = {
    priceUp: "market__item-price--up",
    priceDown: "market__item-price--down",
  };

  categories.forEach((item) => {
    
    const elementLi = document.createElement("li");
    elementLi.classList.add("market__item");
    elementLi.innerHTML = `
            <div class='market__item-bg'>
                <img src='${items[item.name].icon}'width="30" height="30">
            </div>
            <span>${item.name}</span>
        `;
    const spanPrice = document.createElement("span");
    spanPrice.textContent = item.currentPrice;
    spanPrice.classList.add("market__item-price");

    if (action === "sell") {
      spanPrice.classList.add(
        item.currentPrice > item.basePrice
          ? className.priceUp
          : className.priceDown
      );
    } else {
      spanPrice.classList.add(
        item.currentPrice > item.basePrice
          ? className.priceDown
          : className.priceUp
      );
    }

    elementLi.appendChild(spanPrice);

    const conditionDisabled = action === "sell" 
      ? !game.inventory.backpack.includes(item.name) 
      : game.economy.money < item.currentPrice ||
      game.inventory.backpack.length === game.inventory.backpackSlots;
  
    addAction(
      elementLi,
      `${action === "sell" ? "продать" : "купить"}`,
      () => {
        action === "sell"
          ? sellItem(item.name, item.currentPrice)
          : buyItem(item.name, item.currentPrice);
      },
      "market__item-btn",
      null
    ).disabled = conditionDisabled ;

    listContainer.appendChild(elementLi);
  });
}
