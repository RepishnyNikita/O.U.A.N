import { game } from "../variables-game.js";
import { addToLog } from "../utils.js";
import showMainMenu from "../showMainMenu.js";
import { ICON } from "../assets.js";

export default function saveGame() {
  const saveData = {
    energy: game.energy.currentEnergy,
    maxEnergy: game.energy.maxEnergy,
    money: game.economy.money,
    totalMoney: game.economy.totalMoney,
    debtPaid: game.economy.debtPaid,

    policeDebt: game.police.currentDebt,
    policeTotalDebt: game.police.totalDebt,
    numberOfArrests: game.police.numberOfArrests,

    inventory: game.inventory,
    inventorySlots: game.inventorySlots,
    totalHeists: game.totalHeists,
    totalLoot: game.totalLoot,
    marketModifiers: game.marketModifiers,
    sellMarketModifiers: game.sellMarketModifiers,
    marketTimer: game.marketTimer,

    penetrationInHouse: game.penetrationInHouse,
    successfulHeists: game.successfulHeists,
    globalItemTake: game.globalItemTake,
    safesOpened: game.safesOpened,
    globalTargetItemTake: game.globalTargetItemTake,
    totalUseEnergy: game.totalUseEnergy,
  };
  localStorage.setItem("robberSave", JSON.stringify(saveData));
  addToLog("Игра сохранена!", "green",ICON.CHECK_MARK);
  showMainMenu();
}

function autoSave(time) {
  setInterval(() => {
    addToLog(`Автосохранения каждые ${time} минут`,'green',ICON.CHECK_MARK);
    saveGame();
  },time * 60 * 1000);
}
autoSave(5)
