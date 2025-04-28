import { game } from "../../variables-game.js";
import {updateMarketPrices, updateSellMarketPrices, updateMarketTimerUI} from '../../updatesUI.js'

export default function startMarketTimer() {
  clearInterval(game.marketInterval);
  updateMarketPrices()
  updateSellMarketPrices()
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
