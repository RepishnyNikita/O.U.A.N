import { game } from "./variables-game.js";
import handleArrest from './handleArrest.js';
import endRobbery from "./endRobbery.js";
import { ICON } from "./assets.js";
import { updateTimerUI } from "./updatesUI.js";

export default function startTimer() {
    clearInterval(game.gameInterval);
    game.gameInterval = setInterval(() => { 
        game.timeLeft -= 1;
        updateTimerUI();
        
        if (game.timeLeft <= 0) {
            addToLog("Время вышло! Полиция поймала вас.", 'red',ICON.HANDCUFFS);
            handleArrest();
            endRobbery();
        }
    }, 1000);
}


