import { updateEnergyRegenUI, updateEnergyUI } from "./updatesUI.js";
import { game } from "./variables-game.js";

export const startEnergyRegen = () => {
  if (game.energy.energyRegenInterval) {
    clearInterval(game.energy.energyRegenInterval);
    game.energy.energyRegenInterval = null;
  }

  updateEnergyRegenUI(); // Инициализация
  game.energy.energyRegenInterval = setInterval(() => {
    if (game.energy.currentEnergy < game.energy.maxEnergy) {
      game.energy.energyRegenTimer--;
      updateEnergyRegenUI();
      if (game.energy.energyRegenTimer <= 0) {
        game.energy.currentEnergy = Math.min(
          game.energy.maxEnergy,
          game.energy.currentEnergy + 1
        );
        game.energy.energyRegenTimer = 60;
        updateEnergyUI();
      }
    } else {
      game.energy.energyRegenTimer = 60;
      updateEnergyRegenUI();
    }
  }, 1000);
};
