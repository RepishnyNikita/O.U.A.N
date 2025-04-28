import updateUI from "../updatesUI.js";
import { game } from "../variables-game.js";
import { addToLog } from "../utils.js";
import showMainMenu from "../showMainMenu.js";
import initMarketModifiers from "../market/blackMarket/initMarketModifiers.js";
import initModifiers from "../market/initModifiers.js";
import startMarketTimer from "../market/blackMarket/startMarketTimer.js";
import { ICON } from "../assets.js";


// Загрузка игры
export default function loadGame() {
  if(game.startRobbery){
    addToLog('Нельзя загрузить игру во время ограбления!', 'red', ICON.X_MARK)
    return
  }
  const saved = localStorage.getItem("robberSave");
  if (saved) {
    try {
      const saveData = JSON.parse(saved);
      game.energy.currentEnergy = saveData.energy;
      game.energy.maxEnergy = saveData.maxEnergy;
      game.economy.totalMoney = saveData.totalMoney;
      game.economy.money = saveData.money;
      game.economy.debtPaid = saveData.debtPaid;
      game.inventory = saveData.inventory;
      game.inventorySlots = saveData.inventorySlots;
      game.totalHeists = saveData.totalHeists || 0;
      game.totalLoot = saveData.totalLoot || 0;
      game.marketModifiers = saveData.marketModifiers || {};
      game.sellMarketModifiers = saveData.sellMarketModifiers || {};
      game.marketTimer = saveData.marketTimer || 120;
      game.penetrationInHouse = saveData.penetrationInHouse;
      game.successfulHeists = saveData.successfulHeists;
      game.globalItemTake = saveData.globalItemTake;
      game.safesOpened = saveData.safesOpened;
      game.totalUseEnergy = saveData.totalUseEnergy;
      game.globalTargetItemTake = saveData.globalTargetItemTake;

      game.police.currentDebt = saveData.policeDebt || 0;
      game.police.totalDebt = saveData.policeTotalDebt;
      game.police.numberOfArrests = saveData.numberOfArrests;

      // Инициализируем модификаторы, если их нет в сохранении
      if (!game.marketModifiers["отмычка"]) {
        initMarketModifiers();
        initModifiers();
      } else {
        startMarketTimer();
      }

      addToLog("Игра загружена!", "green", ICON.CHECK_MARK);
      updateUI(); 
    } catch (e) {
      addToLog("Ошибка загрузки сохранения", "red", ICON.X_MARK);
    }
  } else {
    addToLog("Нет сохранённой игры!", "red", ICON.X_MARK);
  }

  showMainMenu();
}
