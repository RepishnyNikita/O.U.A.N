import { game } from "../variables-game.js";
import startMarketTimer from "./blackMarket/startMarketTimer.js";

// Инициализация модификаторов цен на черном рынке
export default function initModifiers() {
  game.sellMarketModifiers = {
    "пачка денег": { basePrice: 1500, currentPrice: 1500, modifier: 1},
    "деньги": {  basePrice: 400, currentPrice: 400, modifier: 1},
    "кольцо": {  basePrice: 1000, currentPrice: 1000, modifier: 5},
    "ваза": {  basePrice: 400, currentPrice: 400, modifier: 1 },
    "ноутбук": { basePrice: 400, currentPrice: 400, modifier: 1},
    "украшения": {  basePrice: 400, currentPrice: 400, modifier: 1 },
    "часы": {  basePrice: 400, currentPrice: 400, modifier: 1},
    "антиквариат": {  basePrice: 400, currentPrice: 400, modifier: 1 },
    "картина": {  basePrice: 400, currentPrice: 400, modifier: 1 },
    "нож": {  basePrice: 400, currentPrice: 400, modifier: 1 },
    "алмаз": { basePrice: 400, currentPrice: 400, modifier: 1 },
    "документы": {basePrice: 400, currentPrice: 400, modifier: 1  },
  };

  // Запускаем таймер для изменения цен
  startMarketTimer();
}
