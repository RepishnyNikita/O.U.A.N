import { updateMoneyUI } from "../updatesUI.js";
import { addToLog} from "../utils.js";
import { game } from "../variables-game.js";
import market from "./market.js";

// Продажа предмета
export default function sellItem(itemName, price) {
  const itemIndex = game.inventory.backpack.indexOf(itemName);
  if (itemIndex !== -1) {
    game.inventory.backpack.splice(itemIndex, 1);
    game.economy.money += price;
    game.economy.totalMoney += price

    let message = `${itemName}: продано за $${price}`;
      addToLog(message, "normal-price");
    }

    updateMoneyUI();
    market('sell')
  }

export const sellAllItems = () =>{
  if(game.inventory.backpack.length === 0) return

  const consumables = game.inventory.backpack.filter(itemName => 
    game.market.consumable.some(consumable => consumable.name === itemName)
  );

  let totalEarned = 0;

  game.inventory.backpack.forEach(itemName => {
    const lootItem = game.market.loot.find(item => item.name === itemName);
    if (lootItem && lootItem.currentPrice) {
      totalEarned += lootItem.currentPrice;
    }
  });

  game.economy.money += totalEarned;
  game.economy.totalMoney += totalEarned;
  game.inventory.backpack = [...consumables];

  updateMoneyUI();
  market('sell')
}
