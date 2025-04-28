import showMainMenu from "./showMainMenu.js";
import { game } from "./variables-game.js";
import updateUI from "./updatesUI.js";
import { containerElements } from "./dom-elements.js";
import { showAndHideShop } from "./utils.js";

// Завершение ограбления
export default function endRobbery() {
    clearInterval(game.gameInterval);
     containerElements.debtContainer.classList.remove('is-close')
    
    if (game.events.eventTimer) {
        clearTimeout(game.events.eventTimer);
        game.events.eventTimer = null;
    }
    // containerElements.actionsContainer.classList.remove('actions-container-grid-3-cols')

    game.currentHouse= null
    
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
    updateUI()
    showMainMenu(); 
    showAndHideShop()
}
