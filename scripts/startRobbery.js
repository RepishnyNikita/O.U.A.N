import checkRandomEvents from "./events/checkRandomEvents.js";
import startTimer from "./timer.js";
import { game } from "./variables-game.js";
import showEntryPoints from "./house/showEntryPoints.js";
import { addToLog} from "./utils.js";
import updateUI from "./updatesUI.js";
import { ICON } from "./assets.js";
import { showMenuControls } from "./showMenuControls.js";


// Начать ограбление
export default function startRobbery(houseNumber) {
  addToLog(`Вы выбрали дом под номером ${houseNumber}`,'yellow-2',ICON.HOUSE)
  game.startRobbery = true
  game.energy.currentEnergy--
  game.timeLeft = 480;
  game.totalHeists++; 
  showMenuControls()
  updateUI()
  startTimer();
  checkRandomEvents();
  showEntryPoints();
}
