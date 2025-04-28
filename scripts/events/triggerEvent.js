import startEventTimer from "./startEventTimer.js";
import { game } from "../variables-game.js";
import { updateEventNotification } from "../updatesUI.js";

// Активация события
export default function triggerEvent(event) {
  game.events.activeEvent = event;
  updateEventNotification(event, event.icon, event.duration);
  if (event.apply) event.apply();
  if (event.duration) {
    startEventTimer(event.duration);
    game.events.eventTimer = setTimeout(() => {
      if (event.expire) event.expire();
      game.events.activeEvent = null;
    }, event.duration * 1000);
  }
}
