import takeItem from "../takeItem.js";
import updateInventory from "../updateInventory.js";
import { addAction, addToLog, clearActions } from "../utils.js";
import { game } from "../variables-game.js";
import { items } from "../items.js";
import { ICON } from "../assets.js";
import { attemptExit } from "./attemptEscape.js";


// Обработка сейфа
export default function handleSafe() {
  const room = game.currentHouse.rooms[game.currentRoom];
  if (!room.hasSafe) return;
  const tools = ["отмычка", "декодер"];
  const hasTool = tools.some((tool) => game.inventory.includes(tool));

  if (!hasTool) {
    addToLog("Вы видите сейф, но вам нечем вломать!", "gray",ICON.X_MARK);

    addAction(
      `Нужна отмычка или декодер`,
      null,
      "button-actions-flex disabled",
      ICON.SAFE
    );
    return;
  }
  
  const possibleItemsInSafe = ["деньги", "документы", "украшения", "пачка денег"]; //!Шанс спавна добавить
  let itemInSafe =
    possibleItemsInSafe[Math.floor(Math.random() * possibleItemsInSafe.length)];

  // ПРИ ВЕЧЕРИНКЕ НЕ СПИСЫВАЕМ ЭНЕРГИЮ НА ВЗЛОМ
  const energyCost = game.events.partyHouse ? 0 : 1;
  const timeCostLockpick = 60; 
  const timeCostDecoder = 20; 

  addToLog("Перед вами сейф. Взломать?", "orange",ICON.SAFE);

  if(hasTool){
    tools.forEach(tool =>{
      if(game.inventory.includes(tool)){
        addAction(
          `Взломать ${tool === "отмычка" ? 'отмычкой' : 'декодером'} `,
          () => {
            if (game.energy.currentEnergy >= energyCost) {
              game.energy.currentEnergy -= energyCost;
              game.timeLeft -= tool === "отмычка" ? timeCostLockpick : timeCostDecoder;
      
              const pickIndex = game.inventory.indexOf(tool);
              game.inventory.splice(pickIndex, 1);
              updateInventory();

              room.items.push(itemInSafe);
              room.hasSafe = false;
              handleSafe();
              game.safesOpened++

              addToLog(
                `Вы открыли сейф! Нашли ${itemInSafe}! (- ${energyCost} энергии)`,
                "green"
              );
              clearActions();
              addAction(
                null,
                () => {
                  takeItem(itemInSafe);
                },
                "items",
                items[itemInSafe].icon
              );
              updateInventory();
              addAction(
                null,
                () => attemptExit(game.currentHouse.rooms[game.currentRoom]) ,
                "actions-container-cancellation",
                ICON.BACK
              );
            } else {
              addToLog(`Недостаточно энергии (нужно ${energyCost} )!`, "danger");
            }
          },
          "button-actions button-actions--safe",
          ICON.SAFE
        );
      }
    })
  }

  addAction(
    null,
    () => attemptExit(game.currentHouse.rooms[game.currentRoom]) ,
    "actions-container-cancellation",
    ICON.BACK
  );
}
