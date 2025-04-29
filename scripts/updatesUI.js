import { buttonElements } from "./dom-elements.js";
import { items } from "./items.js";
import showBlackMarket from "./market/blackMarket/showBlackMarket.js";
import sellingLoot from "./market/sellingLoot.js";
import updateInventory from "./updateInventory.js";
import { addToLog } from "./utils.js";
import { game } from "./variables-game.js";


export const updatePoliceDebtUI = () => {
    document.querySelector(
      "[data-js-debt-amount]"
    ).innerHTML = `<i>$</i>${game.police.currentDebt.toLocaleString('en-US')}`;
    document.querySelector('[data-js-debt-total-police]').innerHTML = `/ <i>$</i>${game.police.maxDebt.toLocaleString("en-US")}`
    buttonElements.debtPolicePay.innerHTML= `
      <span>Внести</span>
      <span>$${game.police.baseFine.toLocaleString('en-US')}</span> 
  `;
};

export const updateEventNotification = (
    startEvents = false,
    iconEvents = "icon/noEvents.png",
    duration = false
  )=> {
    const container = document.querySelector("[data-js-event-notification]");
    return (container.innerHTML = `
          <img src='${iconEvents}' width="40" height="40"/>
          <span class="event-notification__timer" data-js-event-timer>${
            !startEvents || !duration ? "" : "00"
          }</span>
      `);
}

export const updateShowTargetItem = (found = false)=> {
    const targetItemContainer = document.querySelector("[data-js-target-item]");
    return targetItemContainer.innerHTML = `
        <span class="${found ? 'target-item__found' : ''}">${!found ? "Найти" : "Найден"}</span>
        <img src="${
          items[game.currentHouse.targetItem.name].icon
        }"  width="40" height="40" title=${game.currentHouse.targetItem.name}>
      `;
}

export const updateMoneyUI = () => {
  document.querySelector(
    "[data-js-money]"
  ).innerText = `$${game.economy.money.toLocaleString("en-US")}`;
};

export const updateMarketTimerUI = () => {
  document.querySelector("[data-js-black-market-timer]").textContent =
    game.marketTimer;
  document.querySelector("[data-js-sell-market-timer]").textContent =
    game.marketTimer;
};

export const updateDebtUI = () => {
  const debtLeft = game.economy.totalDebt - game.economy.debtPaid;
  document.querySelector("[data-js-debt-left]").innerHTML = `<i>$</i>${Math.max(
    0,
    debtLeft
  ).toLocaleString("en-US")}`;
  document.querySelector(
    "[data-js-debt-total]"
  ).innerHTML = `/ <i>$</i>${game.economy.maxDebt.toLocaleString("en-US")}`;
  buttonElements.debtPay.innerHTML = ` 
          <span>Внести</span>
          <span>$${game.economy.baseFine.toLocaleString("en-US")}</span>
      `;
  const progressPercent =
    (game.economy.debtPaid / game.economy.totalDebt) * 100;
  document.querySelector("[data-js-progress]").style.width = `${
    progressPercent > 100 ? 100 : progressPercent
  }%`;
};

export const updateTimerUI = () => {
  const minutes = Math.floor(game.timeLeft / 60);
  const seconds = game.timeLeft % 60;
  document.querySelector("[data-js-timer]").innerText = `${
    minutes < 10 ? "0" + minutes : minutes
  }:${seconds < 10 ? "0" : ""}${seconds}`;
};

export const updateEnergyUI = () => {
  const percent = (game.energy.currentEnergy / game.energy.maxEnergy) * 100;
  document.querySelector("[data-js-battery-fill]").style.width = `${percent}%`;
  document.querySelector(
    "[data-js-battery-count]"
  ).innerHTML = `<span class="energy-bar__regen-count__value">${game.energy.currentEnergy}</span> / <span>${game.energy.maxEnergy}</span>`;
};

export const updateEnergyRegenUI = () => {
    const timerElement = document.querySelector("[data-js-battery-timer]");
    if (game.energy.currentEnergy >= game.energy.maxEnergy) {
      timerElement.textContent = "00:00";
    } else {
      let energy = game.energy.maxEnergy - game.energy.currentEnergy;
      let totalSecond = energy * 60 - (60 - game.energy.energyRegenTimer);
      const minutes = Math.floor(totalSecond / 60);
      const seconds = totalSecond % 60;
      timerElement.textContent = `${minutes < 10 ? "0" + minutes : minutes}:${
        seconds < 10 ? "0" + seconds : seconds
      }`;
    }
};

// Обновление цен на рынке
export const updateSellMarketPrices = () => {
    for (const item in game.sellMarketModifiers) {
      const newModifier = 0.9 + Math.random() * 0.6;
      game.sellMarketModifiers[item].modifier = newModifier;
      game.sellMarketModifiers[item].currentPrice = Math.round(
        game.sellMarketModifiers[item].basePrice * newModifier
      );
    }
  
    addToLog("Цены на приёмку изменились!", "green");
  
    // Обновляем отображение, если окно рынка открыто
    if (document.querySelector("[data-js-sell-market]").style.display === "grid") {
      sellingLoot();
    }
}

// Обновление цен на черном рынке
export const updateMarketPrices = () => {
    for (const item in game.marketModifiers) {
      const newModifier = 0.7 + Math.random() * 0.6;
      game.marketModifiers[item].modifier = newModifier;
      game.marketModifiers[item].currentPrice = Math.round(
        game.marketModifiers[item].basePrice * newModifier
      );
    }
  
    addToLog("Цены на черном рынке изменились!", "green");
  
    if (document.querySelector("[data-js-black-market]").style.display === "grid") {
      showBlackMarket();
    }
}

// Обновление интерфейса
export default function updateUI() {
  updateEnergyUI();
  updateEnergyRegenUI();
  updateMoneyUI();
  updateDebtUI();
  updatePoliceDebtUI();
  updateInventory();
  updateTimerUI();//?Перенести
}
