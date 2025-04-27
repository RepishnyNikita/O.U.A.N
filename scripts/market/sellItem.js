
import updateInventory from "../updateInventory.js";
import { addToLog, updateMoneyUI } from "../utils.js";
import { game } from "../variables-game.js";
import sellingLoot from "./sellingLoot.js";



// Продажа предмета
export default function sellItem(itemName, price) {
  const itemIndex = game.inventory.indexOf(itemName);
  if (itemIndex !== -1) {
    game.inventory.splice(itemIndex, 1);
    game.economy.money += price;
    game.economy.totalMoney += price

    let message = `${itemName}: продано за $${price}`;
      addToLog(message, "normal-price");
    }

    updateInventory();
    updateMoneyUI();
    sellingLoot()
  }
  
