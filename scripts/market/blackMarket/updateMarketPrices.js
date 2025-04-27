import { game } from "../../variables-game.js";
import { addToLog } from "../../utils.js";
import showBlackMarket from "./showBlackMarket.js";

// Обновление цен на черном рынке
export default function updateMarketPrices() {
  for (const item in game.marketModifiers) {
    // Генерируем случайный модификатор от 0.7 до 1.3
    const newModifier = 0.7 + Math.random() * 0.6;
    game.marketModifiers[item].modifier = newModifier;
    game.marketModifiers[item].currentPrice = Math.round(
      game.marketModifiers[item].basePrice * newModifier
    );
  }

  addToLog("Цены на черном рынке изменились!", "success");

  // Обновляем отображение, если окно рынка открыто
  if (document.querySelector("[data-js-black-market]").style.display === "grid") {
    showBlackMarket();
  }
}
