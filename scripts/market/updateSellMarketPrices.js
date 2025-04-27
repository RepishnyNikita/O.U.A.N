import { game } from "../variables-game.js";
import { addToLog } from "../utils.js";
import sellingLoot from "./sellingLoot.js";

// Обновление цен на рынке
export default function updateSellMarketPrices() {
  for (const item in game.sellMarketModifiers) {
    // Генерируем случайный модификатор от 0.7 до 1.3
    const newModifier = 0.9 + Math.random() * 0.6;
    game.sellMarketModifiers[item].modifier = newModifier;
    game.sellMarketModifiers[item].currentPrice = Math.round(
      game.sellMarketModifiers[item].basePrice * newModifier
    );
  }

  addToLog("Цены на приёмку изменились!", "success");

  // Обновляем отображение, если окно рынка открыто
  if (document.querySelector("[data-js-sell-market]").style.display === "grid") {
    sellingLoot();
  }
}
