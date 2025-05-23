import { clearActions, addAction, addToLog } from "../utils.js";
import { game } from "../variables-game.js";
import { entryTypes } from "./entryTypes.js";
import updateUI from "../updatesUI.js";
import attemptEntry from "./attemptEntry.js";
import endRobbery from "../endRobbery.js";
import { items } from "../items.js";
import triggerEvent from "../events/triggerEvent.js";
import { randomEvents } from "../events/randomEvents.js";
import { ICON } from "../assets.js";
import { setContainerClass } from "../setContainerClass.js";
import { containerElements } from "../dom-elements.js";
import { showMenuControls } from "../showMenuControls.js";



// Показать точки входа
export default function showEntryPoints() {
  clearActions();
  setContainerClass('actions-container--column') //? подумать
  const entryGroups = {}; 

  game.currentHouse.entryPoints.forEach((point) => {
    if (!entryGroups[point.type]) {
      entryGroups[point.type] = [];
    }
    entryGroups[point.type].push(point);
  });

  // Создаем кнопки для каждого типа входа
  for (const type in entryGroups) {
    const entryInfo = entryTypes[type];
    addAction(
      containerElements.actionsContainer,
      `Проверить ${entryInfo.description}`,
      () => showSpecificEntryPoints(type),
      "button-actions button-actions--wide-space",
      entryInfo.icon
    );
  }

  addAction(
    containerElements.actionsContainer,
    null,
    () => {
      if (game.energy.currentEnergy <= 0 ) {
        addToLog(
          `Недостаточно энергии для отмены ограбления дома (нужно 1)!`,
          "red",
          ICON.X_MARK
        );
        return;
      }
      addToLog(`Отмена ограбления дома!`, "yellow",ICON.EXIT_MAN);
      endRobbery();
    },
    "button-actions button-actions--control-back",
    ICON.EXIT_MAN
  );
}

// Показать конкретные точки входа определенного типа
function showSpecificEntryPoints(type) {
  clearActions();
  setContainerClass()

  const entryInfo = entryTypes[type];
  
  addToLog(`Осмотр ${entryInfo.description}:`, null, ICON.SEARCH);

  const points = game.currentHouse.entryPoints.filter((p) => p.type === type);

  points.forEach((point) => {
    let status = "";
    if (game.checkedDoors.includes(point.id)) {
      status = point.locked ? "заперто" : "открыто";
      if(point.locked && Math.random() < 0.1){
        if(!game.inventory.includes('камень') && point.type === 'окно'){
          game.inventory.push('камень')
          addToLog('Вы нашли под ногами камень пока осмматривались, и можно воспользоваться','green',items['камень'].icon)
          showMenuControls()
        }
      }
    }
    addAction(
      containerElements.actionsContainer,
      null,
      () => inspectEntryPoint(point),
      `button-actions button-actions--icon-button ${status === "заперто" && "disable"}`,
      entryInfo.icon
    );
  });

  addAction(
    containerElements.actionsContainer,
    null,
    showEntryPoints,
    "button-actions button-actions--control-back",
    ICON.BACK
  );
}

function inspectEntryPoint(entry) {
  const entryType = entryTypes[entry.type];

  if (game.checkedDoors.includes(entry.id)) {
    if (entry.locked) {
      addToLog(`${entryType.description} заперто.`, "gray", ICON.X_MARK);
      handleLockedEntry(entry);
    } else {
      addToLog(`${entryType.description} открыто.`, "green");
      attemptEntry(entry);
    }
    return;
  }

  // НЕ ТРАТИМ ЭНЕРГИЮ НА ПРОВЕРКУ ДВЕРЕЙ ПРИ ВЕЧЕРИНКЕ И ОТКРЫТЫХ ДВЕРЯХ
  const energyCost = game.events.partyHouse || game.events.unlockedDoor ? 0 : 1

  // Проверка точки входа
  if (game.energy.currentEnergy < energyCost) {
    addToLog(
      `Недостаточно энергии для входа в помещение (нужно ${energyCost})!!`,
      "red",
      ICON.X_MARK
    );
    return;
  }

  game.energy.currentEnergy -= energyCost;
  game.checkedDoors.push(entry.id);
  updateUI();

  if (entry.locked) {
    addToLog(`Вы проверили ${entryType.description}. Заперто.`, "gray");
    handleLockedEntry(entry);
  } else {
    addToLog(`Вы проверили ${entryType.description}. Открыто!`, "green");
    attemptEntry(entry);
  }
}

// Обработка запертой точки входа
function handleLockedEntry(entry) {
  const entryType = entryTypes[entry.type];
  clearActions();
  setContainerClass('actions-container--column')

  // Проверяем, есть ли у нас нужный инструмент
  const hasTool = entryType.tools.some((tool) => game.inventory.belt.includes(tool));

  if (hasTool) {
    entryType.tools.forEach((tool) => {
      if (game.inventory.belt.includes(tool)) {
        const toolCost = entryType.toolCosts[tool];
        addAction(
          containerElements.actionsContainer,
          `${tool !== "камень" ? "Открыть" : "Разбить"} ${
            entryType.description
          } с помощью`,
          () => {
            if (game.energy.currentEnergy >= toolCost.energy) {
              game.energy.currentEnergy -= toolCost.energy;
              game.timeLeft -= toolCost.time;
              entry.locked = false;

              const toolIndex = game.inventory.belt.indexOf(tool);
              game.inventory.belt.splice(toolIndex, 1);
              showMenuControls()

              addToLog(
                `Вы ${tool !== "камень" ? "открыли" : "разбили"}  ${
                  entryType.description
                } с помощью ${tool === "камень" ? "камня" : tool}! (-${
                  toolCost.energy
                } энергии, -${toolCost.time} сек)`,
                "success"
              );
              if(tool === "камень"){
                !game.policeCalled && Math.random() < 0.3 ? triggerEvent(randomEvents.POLICE_ALERT) : null
              }
              attemptEntry(entry);
            } else {
              addToLog(
                `Недостаточно энергии для входа через ${entryType.description} (нужно ${toolCost.energy})!`,
                "red"
              );
            }
          },
          "button-actions",
          items[tool].icon
        );
      }
    });
  } else {
    entryType.tools.forEach((tool) => {
      addAction(
        containerElements.actionsContainer,
        `Нужен инструмент:`,
        null,
        "button-actions button-actions--disabled",
        items[tool].icon
      );
    });
  }

  addAction(
    containerElements.actionsContainer,
    null,
    () => showSpecificEntryPoints(entry.type),
    "button-actions button-actions--control-back",
    ICON.BACK
  );
}
