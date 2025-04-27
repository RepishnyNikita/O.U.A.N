import { buttonElements } from "./dom-elements.js";
import { game } from "./variables-game.js";

export default function updateDebtUI() {
  const debtLeft = game.economy.totalDebt - game.economy.debtPaid;
  document.querySelector("[data-js-debt-left]").innerHTML = `<i>$</i>${Math.max(
    0,
    debtLeft
  ).toLocaleString("en-US")}`;
  document.querySelector(
    "[data-js-debt-total]"
  ).innerHTML = `/ <i>$</i>${game.economy.maxDebt.toLocaleString("en-US")}`;
  buttonElements.debtPay.innerHTML = ` 
        <span>Внести</span>
        <span>$${game.economy.baseFine.toLocaleString("en-US")}</span>
    `;
  const progressPercent =
    (game.economy.debtPaid / game.economy.totalDebt) * 100;
  document.querySelector("[data-js-progress]").style.width = `${
    progressPercent > 100 ? 100 : progressPercent
  }%`;
}
