import endRobbery from "../endRobbery.js";
import { entryTypes } from "./entryTypes.js";
import updateUI, { updateEnergyUI } from "../updatesUI.js";
import { clearActions, addToLog } from "../utils.js";
import { game } from "../variables-game.js";
import enterHouse from "./enterHouse.js";
import { ICON } from "../assets.js";


// Попытка побега
export default function attemptEscape() {
  if (!game.usedEntryPoint) {
    addToLog("Ошибка: точка входа не определена", "red");
    return;
  }

  const energyCost = entryTypes[game.usedEntryPoint.type].exitEnergyCost;
  const exitEnergyCost = !game.events.policeCalled && game.events.partyHouse ? 0 : game.events.policeCalled ? energyCost * 2 : energyCost;

  if (game.energy.currentEnergy < exitEnergyCost) {
    addToLog(
      `Недостаточно энергии для выхода из дома (нужно ${exitEnergyCost})!`,
      "red",
      ICON.X_MARK
    );
    return;
  }

  game.energy.currentEnergy -= exitEnergyCost;
  updateUI();
  clearActions();

  const hasTarget = game.inventory.includes(game.currentHouse.targetItem.name);

  if (hasTarget) {
    game.successfulHeists++;
    game.globalTargetItemTake++;
    addToLog(
      `Вы успешно сбегаете с добычей через ${
        entryTypes[game.usedEntryPoint.type].description
      }! (-${exitEnergyCost} энергии)`,
      "violet",
      ICON.EXIT_MAN
    );
  } else {
    addToLog(
      `Вы сбежали через ${
        entryTypes[game.usedEntryPoint.type].description
      }! (-${exitEnergyCost} энергии)`,
      "green",
      ICON.EXIT_MAN
    );
    game.successfulHeists++;
  }

  endRobbery();
}

export const attemptExit = (currentRoom) => {
  const energyCost = game.events.partyHouse && !game.events.isNoticed ? 0 : 1;
  if(game.events.partyHouse && !game.events.policeCalled){
    addToLog(`Вы свободно вышли из помещения ${currentRoom} (- ${energyCost} энергии)`,'gray',ICON.BACK)
    enterHouse();
    return
  }

  if (game.energy.currentEnergy > 0) {
      game.energy.currentEnergy -= energyCost;
      addToLog(`Вы вышли из помещения ${currentRoom} (- ${energyCost} энергии)`,'gray',ICON.BACK)
      updateEnergyUI();
      enterHouse();
  } else {
    addToLog("Недостаточно энергии для выхода из помещения !", "red", ICON.X_MARK);
  }
};
