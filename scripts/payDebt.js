import endGame from "./endGame.js";
import { addToLog} from "./utils.js";
import { game } from "./variables-game.js";
import { EVENTS_ICON, ICON } from "./assets.js";
import { buttonElements } from "./dom-elements.js";
import { updateDebtUI ,updatePoliceDebtUI, updateMoneyUI } from "./updatesUI.js";

function payDebt() {
  if (game.economy.money >= game.economy.baseFine) {
    game.economy.money -= game.economy.baseFine;
    game.economy.debtPaid += game.economy.baseFine;

    addToLog("Вы внесли $1,000 в счет долга", "green", ICON.TOTAL_MONEY);
    updateDebtUI()
    updateMoneyUI()
    if (game.economy.debtPaid >= game.economy.totalDebt) {
      endGame("victory");
    }
  } else {
    addToLog("Недостаточно денег для платежа!", "red", ICON.X_MARK);
  }
}

function payDebtPolice() {
  if (game.police.currentDebt === 0) {
    addToLog(`У вас нет долга перед полицией!`, "gray", EVENTS_ICON.PARTY);
    return;
  }

  if (game.police.currentDebt > 0) {
    if (game.economy.money >= game.police.currentDebt) {
      addToLog(
        `Вы выплатили долг перед полицией в размере $${game.police.baseFine}!`,
        "green",
        ICON.TOTAL_MONEY
      );
      game.economy.money -= Math.min(
        game.police.baseFine,
        game.police.currentDebt
      );
      game.police.currentDebt -= Math.min(
        game.police.baseFine,
        game.police.currentDebt
      );
      updatePoliceDebtUI();
      updateMoneyUI();
      addToLog(
        `Ваш текуший долг $${
          game.police.currentDebt  < 1000
            ? game.police.currentDebt
            : game.police.currentDebt.toLocaleString('en-US')
        }!`,
        "green",
        ICON.TOTAL_MONEY
      );
      return;
    } else {
      addToLog(
        `Недостаточно денег для выплаты долга перед полицией ($${game.police.currentDebt})!`,
        "red",
        ICON.X_MARK
      );
    }
  }
}

export default function initDebtPaymentHandlers() {
    buttonElements.debtPay.addEventListener("click", payDebt);
    buttonElements.debtPolicePay.addEventListener("click", payDebtPolice);
}
//!Можно ли дотянутся до кнопок другим образом?
