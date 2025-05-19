import { clearActions, addAction, addToLog } from "../utils.js";
import { game } from "../variables-game.js";
import attemptEscape from "./attemptEscape.js";
import enterRoom from "./enterRoom.js";
import { ICON } from "../assets.js";
import { setContainerClass } from "../setContainerClass.js";
import { containerElements } from "../dom-elements.js";


let visitedHouse = false;

// Вход в дом
export default function enterHouse() {
  clearActions();
  setContainerClass('actions-container--grid')
  addToLog(`Вы внутри дома`, 'gray', ICON.HOUSE);

  if (!visitedHouse) {
    game.penetrationInHouse++;
    visitedHouse = true;
  }

  Object.keys(game.currentHouse.rooms).forEach((room) => {
    const isVisitedRoom = game.visitedRooms.includes(room)
    addAction(
      containerElements.actionsContainer,
      `${room}`,
      () => enterRoom(room),
      isVisitedRoom
        ? "button-actions button-actions--is-visited"
        : "button-actions",
      ICON.SEARCH
    );
  });


  addAction(
    containerElements.actionsContainer,
    null,
    () => {
      visitedHouse = false;
      attemptEscape();
      setContainerClass()
    },
    "button-actions button-actions--control-back",
    ICON.EXIT
  );
}
