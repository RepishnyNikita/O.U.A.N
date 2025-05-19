import { ICON } from '../assets.js';
import { containerElements } from '../dom-elements.js';
import { addAction } from '../utils.js';
import { inventoryBelt, inventoryHeader, inventoryItems } from './createInventoryLayout.js';

export default function inventory() {
    containerElements.inventory.classList.add('is-open')

    const content = document.createElement('div')
    content.classList.add('inventory-modal__content')

    containerElements.inventory.innerHTML = ''
    content.appendChild(inventoryHeader())
    content.appendChild(inventoryBelt())
    content.appendChild(inventoryItems())

    addAction(content,'закрыть инвентарь', () =>{
        containerElements.inventory.classList.remove('is-open')
        content.remove()
    },'inventory-modal__button-close',ICON.INVENTORY)

    containerElements.inventory.appendChild(content)
}

