import { ICON } from "./assets.js";
import { items } from "./items.js";
import { updateEnergyUI } from "./updatesUI.js";
import { addAction, addToLog } from "./utils.js";
import { game } from "./variables-game.js";

export default function updateInventory() {
    const inventoryElement = document.querySelector("[data-js-inventory]");
    inventoryElement.innerHTML = "";
    
    for (let i = 0; i < game.inventorySlots; i++) {
        const slot = document.createElement("div");
        const icon = document.createElement('img')
        slot.className = "inventory-slot";

        if (game.inventory[i]) {
            if (game.inventory[i] === "энергетик") {
                slot.textContent = ''
                slot.title = 'Выпей меня'
                slot.className = "inventory-slot consumable";
                icon.src = items[game.inventory[i]].icon
            } else {
                if(items[game.inventory[i]].icon){
                    icon.src = items[game.inventory[i]].icon
                }else{
                    slot.textContent = game.inventory[i]; 
                }
                slot.appendChild(addAction('-',() => deleleItem(game.inventory[i]),'button-delete',null))
            }
        } else {
            slot.className = "inventory-slot";
        }
        slot.appendChild(icon)
        inventoryElement.appendChild(slot);
    }

    inventoryElement.addEventListener("click", function (e) {
        const slot = e.target.closest(".inventory-slot");
        if (!slot) return;
        const index = Array.from(this.children).indexOf(slot);
      
        if (index < game.inventory.length) {
          const item = game.inventory[index];
          if (item === "энергетик") {
            useEnergyDrink();
          }
        }
    });
}

function deleleItem(item){
    const itemIndex = game.inventory.indexOf(item);
    game.inventory.splice(itemIndex, 1);
    addToLog(`Вы удалили "${item}" из инвентаря`,'red',ICON.X_MARK)
    updateInventory()
}

function useEnergyDrink() {
    game.totalUseEnergy++
    const index = game.inventory.indexOf("энергетик");
    game.inventory.splice(index, 1);
    game.energy.currentEnergy = Math.min(game.energy.maxEnergy, game.energy.currentEnergy + 3);
    
    addToLog("Вы использовали энергетик! +3 энергии.", 'green',items["энергетик"].icon);
    updateEnergyUI();
    updateInventory();
}