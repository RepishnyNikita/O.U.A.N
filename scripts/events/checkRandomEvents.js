import triggerEvent from "./triggerEvent.js";
import { randomEvents } from "./randomEvents.js";
import { addToLog } from "../utils.js";
import { game } from "../variables-game.js";
import {ICON} from  "../assets.js"
// Проверка случайных событий
export default function checkRandomEvents() {
  // Сбрасываем предыдущие события
  if (game.events.eventTimer) {
    clearTimeout(game.eventTimer);
    game.eventTimer = null;
  }
  game.events.activeEvent = null;
  game.events.policeCalled = false;
  game.events.partyHouse = false;
  game.events.moneySpawned = false;
  game.events.unlockedDoor= false;
  game.events.isNoticed = false;

  // Проверяем возможные события
  for (const eventKey in randomEvents) {
    const event = randomEvents[eventKey];
    if (Math.random() < event.chance) { // запускаем событие от шанса
      triggerEvent(event);
      break; // Только одно событие за раз
    }
  }

  if(!game.events.activeEvent)addToLog('Нет происходящих событий','gray',ICON.EVENTS_NO)
}
