import { ICON } from "../assets.js"
import { containerElements } from "../dom-elements.js"
import { addAction } from "../utils.js"
import { deleteItem, freeSlots, moveItems, useEnergyDrink } from "./actions.js"


export default function menuActions(move ,consumable , item, target){
    const container = document.createElement('div')
    container.classList.add('inventory-modal__controls' , 'is-open')

    const controls = document.createElement('div') 
    controls.classList.add('inventory-modal__controls-menu')

    const classNameBtn = 'inventory-modal__controls-menu__btn'
    controls.innerHTML = ''
    if(move){
        addAction(controls, `${target === 'belt' ? 'на пояс' : 'в рюкзак'}`,
            () => moveItems(item, target) ,`${classNameBtn} ${!freeSlots(target) && 'disabled'}`,ICON.INVENTORY)
    }
    if(consumable){
        addAction(controls,'использовать',()=> useEnergyDrink(item, target) ,classNameBtn,ICON.ENERGY)
    }
    addAction(controls,'выбросить',()=> deleteItem(item, target),classNameBtn,ICON.GARBAGE)
    addAction(controls,'отмена',()=>{
        container.classList.remove('is-open')
        container.remove()
    },classNameBtn,ICON.BACK)

    container.appendChild(controls)
    containerElements.inventory.appendChild(container)
}