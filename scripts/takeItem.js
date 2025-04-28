import { items } from "./items.js";
import updateInventory from "./updateInventory.js";
import { addToLog, addAction, clearActions } from "./utils.js";
import { game } from "./variables-game.js";
import triggerEvent from "./events/triggerEvent.js";
import { randomEvents } from "./events/randomEvents.js";
import handleSafe from "./house/handleSafe.js";
import { ICON } from "./assets.js";
import { attemptExit } from "./house/attemptEscape.js";
import { updateShowTargetItem, updateEnergyUI} from "./updatesUI.js";


// Взять предмет
export default function takeItem(itemName) {
  if (!items[itemName]) {
    addToLog("Ошибка: предмет не найден", "red");
    return;
  }

  game.globalItemTake++;
  const isTargetItem = itemName === game.currentHouse.targetItem.name;

  // В доме с вечеринкой есть шанс вызвать полицию при краже
  if (game.events.partyHouse && Math.random() < 0.5) {
    addToLog("Кто-то заметил, что вы что-то берете!", "red");
    game.events.isNoticed = true
    if (!game.events.policeCalled && Math.random() < 0.5) {
      triggerEvent(randomEvents.POLICE_ALERT);
    }
  }

  const energyCost = game.events.partyHouse && !game.events.isNoticed ? 0 : 1;
  if (game.energy.currentEnergy < energyCost) {
    addToLog(
      `Недостаточно энергии чтобы взять "${itemName}" (нужно ${energyCost})!`,
      "red",
      ICON.X_MARK
    );
    return;
  }

  if (game.inventory.length >= game.inventorySlots) {
    addToLog(
      "Инвентарь полон! Уйдите или освободите инвентарь!",
      "red",
      ICON.INVENTORY
    );
    return;
  }
  game.energy.currentEnergy -= energyCost;
  updateEnergyUI();

  game.inventory.push(itemName);

  //Удаляем из комнаты предмет
  const room = game.currentHouse.rooms[game.currentRoom];
  const itemIndex = room.items.findIndex((item) => item === itemName);

  if (itemIndex === -1) {
    addToLog("Предмет исчез!", "red");
    return;
  }

  room.items.splice(itemIndex, 1);

  if (isTargetItem) {
    game.targetItemFound = true;
    addToLog(
      `Вы нашли нужный предмет - ${game.currentHouse.targetItem.name}!`,
      "green",
      ICON.SEARCH
    );

    updateShowTargetItem(game.targetItemFound);
  }

  addToLog(
    `Вы взяли ${itemName} ${"(- " + energyCost + " энергии)"}`,
    isTargetItem ? "violet" : "",
    items[itemName].icon
  );

  clearActions();
  updateInventory();

  const roomItems = [...game.currentHouse.rooms[game.currentRoom].items];

  if (roomItems.length > 0 || room.hasSafe) {
    if (room.hasSafe) {
      handleSafe();
    }

    roomItems.forEach((item) => {
      addAction(
        null,
        () => {
          takeItem(item);
        },
        "items",
        items[item].icon
      );
    });
  }

  //выход
  addAction(
    null,
    () =>attemptExit(game.currentRoom),
    "actions-container-cancellation",
    ICON.BACK
  );
}
