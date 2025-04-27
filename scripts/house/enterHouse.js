import { clearActions, addAction, addToLog } from "../utils.js";
import { game } from "../variables-game.js";
import attemptEscape from "./attemptEscape.js";
import enterRoom from "./enterRoom.js";
import { containerElements} from "../dom-elements.js";
import { ICON } from "../assets.js";

let visitedHouse = false;

// Вход в дом
export default function enterHouse() {
  clearActions();
  addToLog(`Вы внутри дома`, 'gray', ICON.HOUSE);

  if (!visitedHouse) {
    game.penetrationInHouse++;
    visitedHouse = true;
  }

  // containerElements.actionsContainer.classList.add("actions-container-grid-3-cols");

  Object.keys(game.currentHouse.rooms).forEach((room) => {
    const isVisitedRoom = game.visitedRooms.includes(room)
      ? "Посищено"
      : "Осмотреть";
    addAction(
      `${isVisitedRoom} ${room}`,
      () => enterRoom(room),
      isVisitedRoom === "Посищено"
        ? "button-actions-flex is-visited"
        : "button-actions-flex"
    );
  });


  addAction(
    null,
    () => {
      visitedHouse = false;
      attemptEscape();
    },
    "actions-container-cancellation",
    ICON.EXIT
  );
}
