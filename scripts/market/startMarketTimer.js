import { game } from "../variables-game.js";
import {updateMarketPrices} from '../updatesUI.js'

export default function startMarketTimer() {
  clearInterval(game.marketInterval);
  updateMarketPrices()
  game.marketTimer = 60;

  game.marketInterval = setInterval(() => {
    game.marketTimer--;

    if (game.marketTimer <= 0) {
      updateMarketPrices();
      game.marketTimer = 60;
    }
  }, 1000);
}
