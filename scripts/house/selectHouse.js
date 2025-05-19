import generateHouse from "./generateHouse.js";
import { addToLog, clearActions, addAction } from "../utils.js";
import { game } from "../variables-game.js";
import startRobbery from "../startRobbery.js";
import { containerElements } from "../dom-elements.js";
import endRobbery from "../endRobbery.js";
import { ICON } from "../assets.js";
import {updateEventNotification, updateShowTargetItem} from '../updatesUI.js'
import { setContainerClass } from "../setContainerClass.js";

const houseIconsSrc = [
  { house: "icon/homes/home-1.png" },
  { house: "icon/homes/home-2.png" },
  { house: "icon/homes/home-3.png" },
];

export default function selectHouse() {
  clearActions();
  addToLog(`Выберите дом для ограбления:`, null);
  setContainerClass('actions-container--column')

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
      `Дом ${i}: ${doors} ${doors >= 2 ? "двери" : "дверь"}, ${windows} ${
        windows <= 4 ? "окна" : "окон"
      }${hasGarage ? ", гараж" : ""}`,
      "green",
      ICON.SEARCH
    );

    addAction(
      containerElements.actionsContainer,
      `Дом ${i}`,
      () => {
        if (game.energy.currentEnergy <= 0) {
          addToLog(
            `Недостаточно энергии для входа в дом (нужно 1)`,
            "red",
            ICON.X_MARK
          );
          return;
        }
        game.currentHouse = house;
        game.checkedDoors = [];
        game.visitedRooms = [];
        game.targetItemFound = false;
        containerElements.gamefieldInfo.classList.add("is-visuality");
        updateEventNotification();
        updateShowTargetItem();
        startRobbery(i);
      },
      "button-actions button-actions--wide",
      houseIconsSrc[i - 1].house
    );
  }

  addAction(
    containerElements.actionsContainer,
    null,
    () => {
      addToLog(`Отмена ограбления!`, "gray", ICON.EXIT_MAN);
      endRobbery();
    },
    "button-actions button-actions--control-back",
    ICON.X_MARK
  );
}
