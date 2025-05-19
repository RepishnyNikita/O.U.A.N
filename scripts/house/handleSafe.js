import takeItem from "../takeItem.js";
import { addAction, addToLog, clearActions } from "../utils.js";
import { game } from "../variables-game.js";
import { items } from "../items.js";
import { ICON } from "../assets.js";
import { attemptExit } from "./attemptEscape.js";
import { containerElements } from "../dom-elements.js";


// Обработка сейфа
export default function handleSafe() {
  const room = game.currentHouse.rooms[game.currentRoom];
  if (!room.hasSafe) return;
  const tools = ["отмычка", "декодер"];
  const hasTool = tools.some((tool) => game.inventory.belt.includes(tool));

  if (!hasTool) {
    addToLog("Вы видите сейф, но вам нечем вломать!", "gray",ICON.X_MARK);

    addAction(
      containerElements.actionsContainer,
      null,
      null,
      "button-actions button-actions--safe-disabled",
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
      if(game.inventory.belt.includes(tool)){
        addAction(
          containerElements.actionsContainer,
          null,
          () => {
            if (game.energy.currentEnergy >= energyCost) {
              game.energy.currentEnergy -= energyCost;
              game.timeLeft -= tool === "отмычка" ? timeCostLockpick : timeCostDecoder;
      
              const pickIndex = game.inventory.belt.indexOf(tool);
              game.inventory.belt.splice(pickIndex, 1);

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
                containerElements.actionsContainer,
                null,
                () => {
                  takeItem(itemInSafe);
                },
                "button-actions button-actions--icon-item",
                items[itemInSafe].icon
              );
              addAction(
                containerElements.actionsContainer,
                null,
                () => attemptExit(game.currentHouse.rooms[game.currentRoom]) ,
                "button-actions button-actions--control-back",
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
    containerElements.actionsContainer,
    null,
    () => attemptExit(game.currentHouse.rooms[game.currentRoom]) ,
    "button-actions button-actions--control-back",
    ICON.BACK
  );
}
