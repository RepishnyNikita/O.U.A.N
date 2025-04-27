import { game } from "../variables-game.js";
import startMarketTimer from "./blackMarket/startMarketTimer.js";

// Инициализация модификаторов цен на черном рынке
export default function initModifiers() {
  game.sellMarketModifiers = {
    "пачка денег": { basePrice: 1500, currentPrice: 1500, modifier: 5},
    "деньги": {  basePrice: 100, currentPrice: 100, modifier: 1},
    "кольцо": {  basePrice: 1000, currentPrice: 1000, modifier: 5},
    "ваза": {  basePrice: 400, currentPrice: 400, modifier: 1 },
    "ноутбук": { basePrice: 200, currentPrice: 200, modifier: 1},
    "украшения": {  basePrice: 600, currentPrice: 600, modifier: 1 },
    "часы": {  basePrice: 200, currentPrice: 200, modifier: 7},
    "антиквариат": {  basePrice: 300, currentPrice: 300, modifier: 2 },
    "картина": {  basePrice: 400, currentPrice: 400, modifier: 1 },
    "нож": {  basePrice: 50, currentPrice: 50, modifier: 10 },
    "алмаз": { basePrice: 1000, currentPrice: 1000, modifier: 20 },
    "документы": {basePrice: 500, currentPrice: 400, modifier: 30  },
  };

  // Запускаем таймер для изменения цен
  startMarketTimer();
}
