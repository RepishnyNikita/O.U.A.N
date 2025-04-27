import { addToLog } from "./utils.js";
import endGame from "./endGame.js";
import { game } from "./variables-game.js";
import { ICON } from "./assets.js";
import { buttonElements } from "./dom-elements.js";

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

export const updatePoliceDebtUI = () => {
  document.querySelector(
    "[data-js-debt-amount]"
  ).innerHTML = `<i>$</i>${game.police.currentDebt.toLocaleString('en-US')}`;
  document.querySelector('[data-js-debt-total-police]').innerHTML = `/ <i>$</i>${game.police.maxDebt.toLocaleString("en-US")}`
  buttonElements.debtPolicePay.innerHTML= `
    <span>Внести</span>
    <span>$${game.police.baseFine.toLocaleString('en-US')}</span> 
`;
};
