import showMainMenu from "./showMainMenu.js";
import { startEnergyRegen } from "./energyRegen.js";
import updateUI from "./updatesUI.js";
import initDebtPaymentHandlers from "./payDebt.js";
import { clearLog} from "./utils.js";
import initModifiers from "./market/initModifiers.js";
import loadGame from "./saveAndLoadGame/loadGame.js";
import saveGame from "./saveAndLoadGame/saveGame.js";
import { showMenuControls } from "./showMenuControls.js";

export default function initGame() {
  updateUI();
  startEnergyRegen();
  showMainMenu();
  initDebtPaymentHandlers()
  showMenuControls()

  document
    .querySelector("[data-js-load-button]")
    .addEventListener("click", loadGame);
  document
    .querySelector("[data-js-saved-button]")
    .addEventListener("click", saveGame);

  document
    .querySelector("[data-js-button-clear-log]")
    .addEventListener("click", clearLog);

  // Инициализация модификаторов цен
  initModifiers();
}

// Запуск игры
window.onload = initGame;
