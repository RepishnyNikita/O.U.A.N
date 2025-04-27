import { addToLog } from "./utils.js";
import { game } from "./variables-game.js";


export const startEnergyRegen = () => {
  if (game.energy.energyRegenInterval) {
    clearInterval(game.energy.energyRegenInterval);
    game.energy.energyRegenInterval = null;
  }
  // addToLog('Энергия полностью востановлена!','green')
  updateEnergyRegenUI(); // Инициализация

  game.energy.energyRegenInterval = setInterval(() => {
    if (game.energy.currentEnergy < game.energy.maxEnergy) {
      game.energy.energyRegenTimer--; 
      updateEnergyRegenUI(); 
      if (game.energy.energyRegenTimer <= 0) {
        game.energy.currentEnergy = Math.min(game.energy.maxEnergy, game.energy.currentEnergy + 1); 
        game.energy.energyRegenTimer = 60; 
        updateEnergyUI(); 
      }
    } else {
      game.energy.energyRegenTimer = 60;
      updateEnergyRegenUI();
      
    }
  }, 1000);

  
};


export const updateEnergyUI = () => {

  const percent = (game.energy.currentEnergy / game.energy.maxEnergy) * 100;
  document.querySelector("[data-js-energy-fill]").style.width = `${percent}%`;
  document.querySelector(
    "[data-js-energy-count]"
  ).innerHTML = `<span class="energy-bar__regen-count__value">${game.energy.currentEnergy}</span> / <span>${game.energy.maxEnergy}</span>`;
};

export const updateEnergyRegenUI = () => {
  
  const timerElement = document.querySelector("[data-js-energy-timer]");

  if (game.energy.currentEnergy >= game.energy.maxEnergy) {
    timerElement.textContent = "00:00";
  } else {
    let energy = game.energy.maxEnergy - game.energy.currentEnergy;
    let totalSecond = energy * 60 - (60 - game.energy.energyRegenTimer);
    const minutes = Math.floor(totalSecond / 60);
    const seconds = totalSecond % 60;
    timerElement.textContent = `${minutes < 10 ? "0" + minutes : minutes}:${
      seconds < 10 ? "0" + seconds : seconds
    }`;
  }
};

