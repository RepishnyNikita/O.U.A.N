import { game } from "./variables-game.js";
import handleArrest from './handleArrest.js';
import endRobbery from "./endRobbery.js";
import { ICON } from "./assets.js";

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

export const updateTimerUI = () => {
    const minutes = Math.floor(game.timeLeft / 60);
    const seconds = game.timeLeft % 60;
    document.querySelector("[data-js-timer]").innerText = 
        `${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}
