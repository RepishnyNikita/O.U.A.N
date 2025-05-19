import showMainMenu from "./showMainMenu.js";
import { game } from "./variables-game.js";
import updateUI from "./updatesUI.js";
import { containerElements } from "./dom-elements.js";
import { showMenuControls } from "./showMenuControls.js";


// Завершение ограбления
export default function endRobbery() {
    clearInterval(game.gameInterval);

    if (game.events.eventTimer) {
        clearTimeout(game.events.eventTimer);
        game.events.eventTimer = null;
    }

    game.currentHouse= null
    game.startRobbery = false
    game.events.activeEvent = null;
    game.events.policeCalled = false;
    game.events.partyHouse = false;
    game.events.isNoticed = false;
    game.events.moneySpawned = false;

    game.usedEntryPoint = null;
    game.lastSoldItem = null;
    game.lastSaleResult = null;
    game.targetItemFound = false;
    game.hiddenStore = false;
    containerElements.gamefieldInfo.classList.remove('is-visuality')
    showMenuControls()
    updateUI()
    showMainMenu(); 
}
