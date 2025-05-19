import { ICON } from "./assets.js";
import { containerElements } from "./dom-elements.js";
import selectHouse from "./house/selectHouse.js";
import { addToLog, clearActions, addAction } from "./utils.js";
import { game } from "./variables-game.js";


// Главное меню
export default function showMainMenu() {
  clearInterval(game.gameInterval);
  clearActions();
  addToLog("Главное меню:", null);
  addAction(containerElements.actionsContainer,"Начать ограбления", selectHouse, 'button-actions', ICON.HOUSE);
}
