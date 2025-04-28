import updateInventory from "../updateInventory.js";
import { updateMoneyUI } from "../updatesUI.js";
import { addToLog} from "../utils.js";
import { game } from "../variables-game.js";

// Покупка предмета
export default function buyItem(itemName, price) {
  if (game.economy.money >= price) {
    if (game.inventory.length >= game.inventorySlots) {
      addToLog("Инвентарь полон! Освободите место.", "danger");
      return;
    }

    game.economy.money -= price;
    game.inventory.push(itemName);
    addToLog(`Вы купили ${itemName} за $${price}`, "success");
    updateInventory();
    updateMoneyUI();
    document.querySelector("[data-js-black-market-money]").textContent = game.economy.money; 
  } else {
    addToLog("Недостаточно денег!", "no-money");
  }
}
