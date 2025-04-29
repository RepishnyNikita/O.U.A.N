import { addToLog } from "./utils.js";
import endGame from "./endGame.js";
import { game } from "./variables-game.js";
import { ICON } from "./assets.js";
import {updatePoliceDebtUI} from './updatesUI.js'


export default function handleArrest() {
  game.police.currentDebt += game.police.baseFine;
  if (game.police.currentDebt >= game.police.maxDebt) {
    addToLog(
      `Долг перед полицией достиг $${game.police.maxDebt}! Игра окончена.`,
      "red",
      ICON.X_MARK
    );
    endGame("lose");
    return;
  }

  if (game.inventory.length > 0) {
    game.inventory = [];
    addToLog(
      `Полиция конфисковала все предметы из инвентаря!`,
      "red",
      ICON.X_MARK
    );
  }

  game.police.totalDebt += game.police.baseFine;
  game.police.numberOfArrests++;

  addToLog(
    `Штраф: ${game.police.baseFine} добавлено к долгу перед полицией.`,
    "red",
    ICON.TOTAL_MONEY
  );
  updatePoliceDebtUI();
}

