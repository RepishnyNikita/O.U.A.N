import { updateEnergyRegenUI, updateEnergyUI } from "./energyRegen.js";
import { updatePoliceDebtUI } from "./handleArrest.js";
import updateDebtUI from "./updateDebtUI.js";
import updateInventory from "./updateInventory.js";
import {  showAndHideShop, updateMoneyUI } from "./utils.js";
import {updateTimerUI} from "./timer.js";

// Обновление интерфейса
export default function updateUI() {
    updateEnergyUI();
    updateEnergyRegenUI();
    updateTimerUI();
    updateMoneyUI();
    updateDebtUI();
    updatePoliceDebtUI();
    updateInventory();
    showAndHideShop()
}
