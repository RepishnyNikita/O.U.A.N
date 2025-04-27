import { updateEnergyUI } from "../energyRegen.js";
import enterHouse from "./enterHouse.js";
import handleSafe from "./handleSafe.js";
import { items } from "../items.js";
import takeItem from "../takeItem.js";
import updateUI from "../updateUI.js";
import { addToLog, clearActions, addAction } from "../utils.js";
import { game } from "../variables-game.js";
import { containerElements } from "../dom-elements.js";
import { ICON } from "../assets.js";
import { attemptExit } from "./attemptEscape.js";


// Вход в комнату
export default function enterRoom(roomName) {
  if (!game.currentHouse.rooms[roomName]) {
    addToLog("Ошибка: комната не найдена", "red");
    return;
  }
  
  // containerElements.actionsContainer.classList.remove('actions-container-grid-3-cols')

  // НЕ ТРАТИМ ЭНЕРГИЮ НА ПРОВЕРКУ КОМНАТ ПРИ ВЕЧЕРИНКЕ
  const energyCost = game.events.partyHouse ? 0 : 1;
  if (game.energy.currentEnergy < energyCost) {
    addToLog(`Недостаточно энергии для входа в помещение (нужно ${energyCost})!`, "red", ICON.X_MARK);
    return;
  }
  game.energy.currentEnergy -= energyCost;
  game.currentRoom = roomName;

  if (!game.visitedRooms.includes(roomName)) { 
    game.visitedRooms.push(roomName);
  }

  updateUI();
  clearActions();
  addToLog(
    `Вы вошли в помещение ${roomName} (- ${energyCost} енергии)`,
    "gray",
    ICON.EXIT_MAN
  );

  const room = game.currentHouse.rooms[roomName];

  if (!game.targetItemFound && game.currentHouse.targetItem.room === roomName) {
      room.items.push(game.currentHouse.targetItem.name)
      game.targetItemFound = true
  }

  if(room.hasSafe){
    handleSafe()
  }

  const roomItems = [...room.items];

  roomItems.forEach((item) => {
    if (!items[item]) {
      addToLog(`Ошибка: предмет ${item} не найден в базе`, "red");
      return;
    }
    addAction(null, () => takeItem(item),'items', items[item].icon);
  });

  addAction(
    null,()=>
    attemptExit(roomName),
    "actions-container-cancellation",
    ICON.BACK
  );
}
