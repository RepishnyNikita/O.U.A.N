import { items } from "../items.js";
import { game } from "../variables-game.js";

export default function updateShowTargetItem(found = false) {
  const targetItemContainer = document.querySelector("[data-js-target-item]");
  return targetItemContainer.innerHTML = `
      <span class="${found ? 'target-item__found' : ''}">${!found ? "Найти" : "Найден"}</span>
      <img src="${
        items[game.currentHouse.targetItem.name].icon
      }"  width="40" height="40" title=${game.currentHouse.targetItem.name}>
    `;
}
