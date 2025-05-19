import { game } from "./variables-game.js";

// Завершение игры
export default function endGame() {
    clearInterval(game.gameInterval);
    clearInterval(game.energy.energyRegenInterval);
    clearInterval(game.marketInterval);

    // openStatsModal(true, result)
}

