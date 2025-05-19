import { ICON } from "../assets.js";
import { items } from "../items.js";
import { addAction } from "../utils.js";
import { game } from "../variables-game.js";
import menuActions from "./menuActions.js";

export const inventoryHeader = () => {
  const container = document.createElement("div");
  container.classList.add("inventory-modal__header");
  container.innerHTML = `
        <div class="inventory-modal__stats-panel">
            <img src= ${ICON.ENERGY}>
            <span>${game.energy.currentEnergy} / ${game.energy.maxEnergy}</span>
        </div>

        <h3>Инвентарь</h3>

        <div class="inventory-modal__stats-panel">
            <img src=${ICON.INVENTORY}>
            <span>${game.inventory.backpack.length} / ${game.inventory.maxBackpackSlots}</span>
        </div>
    `;
  return container;
};

export const inventoryBelt = () => {
  const container = document.createElement("div");
  container.classList.add("inventory-modal__belt");

  const title = document.createElement("h4");
  title.textContent = "пояс";

  const content = document.createElement("div");
  content.classList.add("inventory-modal__belt-content");

  const beltList = document.createElement("ul");
  beltList.classList.add("inventory-modal__belt-list");

  const beltSlots = document.createElement("ul");
  beltSlots.classList.add("inventory-modal__belt-slots");

  for (let i = 0; i < game.inventory.beltSlots; i++) {
    const item = document.createElement("li");
    item.classList.add("inventory-modal__belt-item");
    const icon = document.createElement("img");

    if (game.inventory.belt[i]) {
      icon.src = items[game.inventory.belt[i]].icon;
      item.textContent = items[game.inventory.belt[i]].description;
      item.appendChild(icon);
    } else {
      item.textContent = `${i + 1} - расходный предмет`;
    }
    beltList.appendChild(item);
  }

  for (let i = 0; i < game.inventory.beltSlots; i++) {
    const item = document.createElement("li");
    item.classList.add("inventory-modal__belt-slot");

    if (game.inventory.belt[i]) {
      let icon = items[game.inventory.belt[i]].icon;
      addAction(
        item,
        null,
        () =>
          menuActions(
            items[game.inventory.belt[i]].consumable,
            items[game.inventory.belt[i]].type === "consumable",
            game.inventory.belt[i],
            "inventory"
          ),
        "inventory-modal__belt-slot-button",
        icon
      );
    } else {
      item.textContent = i + 1;
    }
    beltSlots.appendChild(item);
  }

  content.appendChild(beltList);
  content.appendChild(beltSlots);
  container.innerHTML = "";
  container.appendChild(title);
  container.appendChild(content);

  return container;
};

export const inventoryItems = () => {
  const container = document.createElement("div");
  container.classList.add("inventory-modal__backpack");
  const title = document.createElement("h4");
  title.textContent = "рюкзак";
  const list = document.createElement("ul");
  list.classList.add("inventory-modal__backpack-list");

  for (let i = 0; i < game.inventory.backpackSlots; i++) {
    const item = document.createElement("li");
    item.classList.add("inventory-modal__backpack-item");
    let icon = null;

    if (game.inventory.backpack[i]) {
      icon = items[game.inventory.backpack[i]].icon;
    } else {
      icon = ICON.INVENTORY_WHITE;
    }
    addAction(
      item,
      null,
      () =>
        menuActions(
          items[game.inventory.backpack[i]].consumable,
          items[game.inventory.backpack[i]].type === "consumable",
          game.inventory.backpack[i],
          "belt"
        ),
      "inventory-modal__backpack-item-button",
      icon
    );
    list.appendChild(item);
  }

  container.innerHTML = "";
  container.appendChild(title);
  container.appendChild(list);

  return container;
};
