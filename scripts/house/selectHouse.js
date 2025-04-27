//!ВЫБОР ДОМА
import { addToLog, clearActions, addAction, clearLog} from "../utils.js";
import { game } from "../variables-game.js";
import generateHouse from "./generateHouse.js";
import startRobbery from "../startRobbery.js";
import updateShowTargetItem from "./updateShowTargetItem.js";
import { containerElements } from "../dom-elements.js";
import endRobbery from "../endRobbery.js";
import showEventNotification from "../events/showEventnotification.js";
import { ICON } from "../assets.js";

const houseIconsSrc = [
  {house: 'icon/homes/home-1.png'},
  {house: 'icon/homes/home-2.png'},
  {house: 'icon/homes/home-3.png'}
]

export default function selectHouse() {
  clearActions();
  addToLog(`Выберите дом для ограбления:`, "normal");

  for (let i = 1; i <= 3; i++) {
    const house = generateHouse();
    const doors = house.entryPoints.filter(
      (point) => point.type === "дверь"
    ).length;
    const windows = house.entryPoints.filter(
      (point) => point.type === "окно"
    ).length;
    const hasGarage = house.entryPoints.some((point) => point.type === "гараж");
    addToLog(
      `Дом ${i}: ${doors} ${doors >= 2 ? "двери" : "дверь"}, ${windows} ${windows <= 4 ? "окна" : "окон"}${
        hasGarage ? ", гараж" : ""
      }`,
      "green",
      ICON.SEARCH
    );
    
    addAction(`Дом ${i}`, () => {
      if(game.energy.currentEnergy <= 0){
        addToLog(`Недостаточно энергии для входа в дом (нужно 1)`,'red',ICON.X_MARK)
        return
      }
      game.currentHouse = house;
      game.checkedDoors = [];
      game.visitedRooms = [];
      game.targetItemFound = false;
      containerElements.gamefieldInfo.classList.add('is-visuality')
      showEventNotification()
      updateShowTargetItem()
      startRobbery(i); 
    },'button-actions-flex reverse', houseIconsSrc[i-1].house);
  }

  addAction(null, ()=>{
    addToLog(`Отмена ограбления!`, "gray",ICON.EXIT_MAN);
    endRobbery()
  },'actions-container-cancellation',ICON.X_MARK);
}

