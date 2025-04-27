import checkRandomEvents from "./events/checkRandomEvents.js";
import startTimer from "./timer.js";
import { game } from "./variables-game.js";
import showEntryPoints from "./house/showEntryPoints.js";
import { addToLog} from "./utils.js";
import updateUI from "./updateUI.js";
import { ICON } from "./assets.js";

// Начать ограбление
export default function startRobbery(houseNumber) {
  addToLog(`Вы выбрали дом под номером ${houseNumber}`,'yellow-2',ICON.HOUSE)
  game.energy.currentEnergy--
  game.timeLeft = 480;
  game.totalHeists++; //в статистику
  game.hiddenStore = true;
  updateUI()
  startTimer();
  checkRandomEvents();
  showEntryPoints();
}
