
import { updateMoneyUI } from "../updatesUI.js";
import { addToLog } from "../utils.js";
import { game } from "../variables-game.js";
import market from "./market.js";

// Покупка предмета
export default function buyItem(itemName, price) {
  if (game.economy.money >= price) {
    if (game.inventory.backpack.length >= game.inventory.backpackSlots) {
      addToLog("Инвентарь полон! Освободите место.", "danger");
      return;
    }

    game.economy.money -= price;
    game.economy.spentOnPurchase += price;
    game.inventory.backpack.push(itemName);
    addToLog(`Вы купили ${itemName} за $${price}`, "success");
    updateMoneyUI();
    market("buy");
  } else {
    addToLog("Недостаточно денег!", "no-money");
  }
}

//!Либо обьеденить 
export const buySlot = () => {
  if (game.inventory.backpackSlots >= game.inventory.maxBackpackSlots) {
    addToLog("Максимальный размер инвентаря (12 слотов)!", "danger");
    return;
  }

  if (game.economy.money >= 2000) {
    game.economy.money -= 2000;
    game.inventory.backpackSlots += 1;
    addToLog(
      "+1 слот инвентаря! Теперь у вас " + game.inventory.backpackSlots + " слотов.",
      "success"
    );
    updateMoneyUI();
    market("buy");
  } else {
    addToLog("Недостаточно денег!", "no-money");
  }

};
