import checkRandomEvents from "./events/checkRandomEvents.js";
import startTimer from "./timer.js";
import { game } from "./variables-game.js";
import showEntryPoints from "./house/showEntryPoints.js";
import { addToLog, showAndHideShop} from "./utils.js";
import updateUI from "./updatesUI.js";
import { ICON } from "./assets.js";
import { containerElements } from "./dom-elements.js";


// Начать ограбление
export default function startRobbery(houseNumber) {
  addToLog(`Вы выбрали дом под номером ${houseNumber}`,'yellow-2',ICON.HOUSE)
  // containerElements.debtContainer.classList.add('is-close')
  game.startRobbery = true
  game.energy.currentEnergy--
  game.timeLeft = 480;
  game.totalHeists++; //в статистику
  game.hiddenStore = true;
  updateUI()
  startTimer();
  checkRandomEvents();
  showAndHideShop()
  showEntryPoints();
}
