import updateInventory from "../updateInventory.js";
import updateUI from "../updateUI.js";
import { addToLog } from "../utils.js";
import { game } from "../variables-game.js";
import showEntryPoints from "./showEntryPoints.js";
import { entryTypes } from "./entryTypes.js";
import enterHouse from "./enterHouse.js";

// Попытка проникновения
export default function attemptEntry(entry) {
  console.log('МЕня вызвала что то');
  const entryType = entryTypes[entry.type];

  if (entry.locked) {
    const hasTool = game.inventory.some((item) =>
      entryType.tools.includes(item)
    );

    if (!hasTool) {
      addToLog(
        `Не удалось войти через ${
          entryType.description
        }! Нужен инструмент: ${entryType.tools.join(" или ")}`,
        "danger"
      );
      showEntryPoints();
      return;
    }
  }

  const energyCost = entry.locked ? entryType.energyCost : 0; // если открыто не тратим энергию

  if (game.energy.currentEnergy < energyCost) {
    addToLog(`Недостаточно энергии (УЛИЦА) (требуется ${energyCost})!`, "red");
    showEntryPoints();
    return;
  }
  
  game.energy.currentEnergy -= energyCost;
  game.timeLeft -= entryType.timeCost;
  game.usedEntryPoint = entry;

  updateUI();

  if (entry.locked) {
    const usedTool = entryType.tools.find((tool) =>
      game.inventory.includes(tool)
    );
    if (usedTool) {
      const toolIndex = game.inventory.indexOf(usedTool);
      game.inventory.splice(toolIndex, 1);
      addToLog(
        `Использован ${usedTool} для входа через ${entryType.description}`,
        "gray"
      );
      updateInventory();
    }

    addToLog(
      `Вы проникли через ${entryType.description}! (-${energyCost} энергии, -${entryType.timeCost} сек)`,
      "success"
    );
  } else {
    addToLog(
      `Вы вошли через ${entryType.description}! (-${entryType.timeCost} сек)`,
      "success"
    );
  }

  enterHouse();
}
