import { updateMarketTimerUI } from "../../utils.js";
import { game } from "../../variables-game.js";
import updateSellMarketPrices from "../updateSellMarketPrices.js";
import updateMarketPrices from "./updateMarketPrices.js";


// Таймер для изменения цен на рынках
export default function startMarketTimer() {
  clearInterval(game.marketInterval);
  game.marketTimer = 120;
  updateMarketTimerUI();

  game.marketInterval = setInterval(() => {
    game.marketTimer--;
    updateMarketTimerUI();

    if (game.marketTimer <= 0) {
      updateMarketPrices();
      updateSellMarketPrices()
      game.marketTimer = 120;
    }
  }, 1000);
}
