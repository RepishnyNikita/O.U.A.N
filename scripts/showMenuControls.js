import { ICON } from "./assets.js";
import { showStatsModal } from "./showStatsModal.js";
import saveGame from "./saveAndLoadGame/saveGame.js";
import loadGame from "./saveAndLoadGame/loadGame.js";
import showModalDebt from "./modal/showModalDebt.js";
import market from "./market/market.js";
import { game } from "./variables-game.js";
import { addAction } from "./utils.js";
import inventory from "./inventory/inventory.js";

const container = document.querySelector("[data-js-game-footer]");

export const showMenuControls = () => {
  container.innerHTML = "";
  addAction(container,"Долги", showModalDebt, "button-controls", ICON.DEBT).disabled = game.startRobbery;
  addAction(container,"Рынок", () => showMarket(), "button-controls", ICON.DEBT).disabled = game.startRobbery;
  addAction(container,"Опции", showOption, "button-controls", ICON.CHECK_MARK).disabled = game.startRobbery;
  addAction(container,
    `Инвентарь(${game.inventory.backpack.length}/${game.inventory.backpackSlots})`,
    () => inventory (),
    "button-controls",
    ICON.INVENTORY
  );
};

const showMarket = () => {
  container.innerHTML = "";
  addAction(container,"Сбыт",() => market('sell'), "button-controls", ICON.SELL);
  addAction(container,"Снабжение",() => market('pay'), "button-controls", ICON.PAY);
  addAction(container,"Информатор(скоро)", () => null, "button-controls", null);
  addAction(container,"Назад", () => showMenuControls(), "button-controls", ICON.BACK);
};

const showOption = () => {
  container.innerHTML = "";
  addAction(container,"Статистика", showStatsModal, "button-controls", ICON.STATISTIC);
  addAction(container,"Сохранить игру", saveGame, "button-controls", ICON.DEBT);
  addAction(container,"Настройки", showSettings, "button-controls", ICON.DEBT);
  addAction(container,"Назад", () => showMenuControls(), "button-controls", ICON.BACK);
};

const showSettings = () => {
  container.innerHTML = "";
  addAction(container,"Загрузить игру", loadGame, "button-controls", ICON.DEBT);
  addAction(container,"Звук", null, "button-controls", ICON.DEBT);
  addAction(container,"Установки", null, "button-controls", ICON.DEBT);
  addAction(container,"Назад", () => showOption(), "button-controls", ICON.BACK);
};


