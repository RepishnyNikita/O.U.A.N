import { game } from "../../variables-game.js";
import startMarketTimer from "./startMarketTimer.js";

// Инициализация модификаторов цен на черном рынке
export default function initMarketModifiers() {
  game.marketModifiers = {
    "отмычка": { basePrice: 400, currentPrice: 400, modifier: 1 },
    "лом": { basePrice: 300, currentPrice: 300, modifier: 1 },
    "болторез": { basePrice: 600, currentPrice: 600, modifier: 1 },
    "энергетик": { basePrice: 200, currentPrice: 200, modifier: 1 },
    "декодер": { basePrice: 200, currentPrice: 200, modifier: 1 },
  };

  // Запускаем таймер для изменения цен
  startMarketTimer();
}
