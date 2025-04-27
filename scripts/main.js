import showMainMenu from "./showMainMenu.js";
import { startEnergyRegen } from "./energyRegen.js";
import initMarketModifiers from "./market/blackMarket/initMarketModifiers.js";
import updateUI from "./updateUI.js";
import initDebtPaymentHandlers from "./payDebt.js";
import sellingLoot from "./market/sellingLoot.js";
import { addToLog, clearLog } from "./utils.js";
import initModifiers from "./market/initModifiers.js";
import loadGame from "./saveAndLoadGame/loadGame.js";
import saveGame from "./saveAndLoadGame/saveGame.js";

export default function initGame() {
  updateUI();
  startEnergyRegen();
  showMainMenu();
  initDebtPaymentHandlers()

  document.querySelector('[data-js-button-burger]').addEventListener('click',()=>{
    document.querySelector('[data-js-header-dialog]').classList.toggle('is-open')
  })

  document
    .querySelector("[data-js-load-button]")
    .addEventListener("click", loadGame);
  document
    .querySelector("[data-js-saved-button]")
    .addEventListener("click", saveGame);

  // Инициализация рынка
  document
    .querySelector("[data-js-sell-market-close-btn]")
    .addEventListener("click", function () {
      addToLog("Вы покинули рынок:", "gray");
      document.querySelector("[data-js-sell-market]").style.display = "none";
    });

  document
    .querySelector("[data-js-sell-market-btn]")
    .addEventListener("click", sellingLoot);
    
  document
    .querySelector("[data-js-button-clear-log]")
    .addEventListener("click", clearLog);

  // Инициализация модификаторов цен
  initModifiers();
  initMarketModifiers();
}

// Запуск игры
window.onload = initGame;
