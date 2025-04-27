import { openStatsModal } from "./showStatsModal.js";
import { game } from "./variables-game.js";

// Завершение игры
export default function endGame(result) {
    clearInterval(game.gameInterval);
    clearInterval(game.energy.energyRegenInterval);
    clearInterval(game.marketInterval);

    openStatsModal(true, result)
}

