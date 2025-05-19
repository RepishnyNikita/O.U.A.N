import { game } from "../variables-game.js";
import startMarketTimer from "./startMarketTimer.js";


export default function initModifiers() {
  game.market = {
    loot:[
      { name: "пачка денег", basePrice: 1500, currentPrice: 1500, modifier: 1 },
      { name: "деньги", basePrice: 100, currentPrice: 100, modifier: 1 },
      { name: "кольцо", basePrice: 1000, currentPrice: 1000, modifier: 1 },
      { name: "ваза", basePrice: 400, currentPrice: 400, modifier: 1 },
      { name: "ноутбук", basePrice: 200, currentPrice: 200, modifier: 1 },
      { name: "украшения", basePrice: 600, currentPrice: 600, modifier: 1 },
      { name: "часы", basePrice: 200, currentPrice: 200, modifier: 1 },
      { name: "антиквариат", basePrice: 300, currentPrice: 300, modifier: 1 },
      { name: "картина", basePrice: 400, currentPrice: 400, modifier: 1 },
      { name: "нож", basePrice: 50, currentPrice: 50, modifier: 1 },
      { name: "алмаз", basePrice: 1000, currentPrice: 1000, modifier: 1 },
      { name: "документы", basePrice: 500, currentPrice: 400, modifier: 1 },
    ],
    consumable:[
      { name: "лом", basePrice: 400, currentPrice: 400, modifier: 1},
      { name: "отмычка", basePrice: 600, currentPrice: 600, modifier: 1},
      { name: "декодер", basePrice: 1000, currentPrice: 1000, modifier: 1},
      { name: "болторез", basePrice: 500, currentPrice: 400, modifier: 1},
      { name: "энергетик", basePrice: 500, currentPrice: 400, modifier: 1},
    ]
  }

  startMarketTimer();
}
