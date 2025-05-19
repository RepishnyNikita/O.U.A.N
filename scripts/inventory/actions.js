import { items } from "../items.js"
import { game } from "../variables-game.js"
import { showMenuControls } from '../showMenuControls.js';
import { updateEnergyUI } from '../updatesUI.js';
import inventory from "./inventory.js";

export const freeSlots=(target)=>{
    const [currentLength, maxLength] = target === 'belt'
    ? [ game.inventory.belt.length, game.inventory.beltSlots]
    : [ game.inventory.backpack.length, game.inventory.backpackSlots]
    if(currentLength === maxLength) return false
    return true
}

export const deleteItem=(item, target)=>{
    const [where , index] = target !== 'belt'
    ? [game.inventory.belt, game.inventory.belt.indexOf(item)]
    : [game.inventory.backpack, game.inventory.backpack.indexOf(item)]

    if(index === -1) return
    where.splice(index,1)
    inventory()
    showMenuControls()
}

export const moveItems=(item, target)=>{
    const [from, to] = target === 'belt'
    ? [game.inventory.backpack, game.inventory.belt]
    : [game.inventory.belt, game.inventory.backpack]

    const itemIndex = from.indexOf(item);
    if(itemIndex === -1 && !items[item].consumable) return
        to.push(item)
        from.splice(itemIndex , 1)
    inventory()
    showMenuControls()
}

export const useEnergyDrink=(item, target)=> {
    const [where , index] = target !== 'belt'
    ? [game.inventory.belt, game.inventory.belt.indexOf(item)]
    : [game.inventory.backpack, game.inventory.backpack.indexOf(item)]

    if(item !== 'энергетик' && index === -1) return
    where.splice(index, 1)

    game.totalUseEnergy++
    game.energy.currentEnergy = Math.min(game.energy.maxEnergy, game.energy.currentEnergy + 3);
    updateEnergyUI();
    showMenuControls()
    inventory()
}
