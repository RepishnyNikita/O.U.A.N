import { addToLog } from "../utils.js";
import handleArrest from "../handleArrest.js";
import endRobbery from "../endRobbery.js";
import { game } from "../variables-game.js";
import { EVENTS_ICON, ICON } from "../assets.js";
import { rooms } from "../house/rooms.js";
import { items } from "../items.js";


// Типы случайных событий
export const randomEvents = {
  UNLOCKED_DOORS: {
    description: "Хозяева забыли закрыть все двери!",
    duration: null,
    icon: EVENTS_ICON.OPEN_DOOR,
    chance: 0.1,
    apply: function () {
      game.currentHouse.entryPoints.forEach((point) => {
        if (point.type === "дверь") point.locked = false;
      });
      game.events.unlockedDoor = true;
      addToLog(
        "Все двери в доме открыты! Вы можете войти без инструментов.",
        "green",
      );
    },
  },

  MONEY_SPAWN: {
    description: "В одной из комнат куча денег!",
    icon: EVENTS_ICON.MORE_MONEY,
    chance: 0.1,
    duration: 1,
    apply: function () {
      const rooms = Object.keys(game.currentHouse.rooms);
      const randomRoom = rooms[Math.floor(Math.random() * rooms.length)];
      game.currentHouse.rooms[randomRoom].items.push("пачка денег");
      game.events.moneySpawned = true;
      addToLog(`Событие: Вы подслушали двух странных людей, они говорили о деньгах в доме!`, "violet",EVENTS_ICON.MORE_MONEY);
    },
    expire: function () {
      addToLog(`Надеюсь вы успели найти деньги!`, null,EVENTS_ICON.MORE_MONEY);
      game.events.moneySpawned = false;
    },
  },
  POLICE_ALERT: {
    description: "Кто-то вызвал полицию! У вас 10 секунд чтобы сбежать!",
    duration: 5,
    chance:  0.1,
    icon: EVENTS_ICON.PHLASHER,
    apply: function () {
      addToLog(
        `Кто-то вызвал полицию! У вас ${randomEvents.POLICE_ALERT.duration} секунд чтобы сбежать!`,
        "red",
        EVENTS_ICON.PHLASHER
      );
      game.events.policeCalled = true;
    },
    expire: function () {
      if (game.currentHouse) {
        addToLog("Полиция прибыла! Вы арестованы!", "red",ICON.PRISON);
        handleArrest();
        endRobbery();
      }
    },
  },
  HOUSE_PARTY: {
    chance: 0.1,
    duration: 20,
    icon: EVENTS_ICON.PARTY,
    apply: function () {
      game.events.partyHouse = true;
      game.currentHouse.entryPoints.forEach((point) => {
        point.locked = false;
      });
      addToLog(
        "В доме идет вечеринка - все двери и окна открыты!",
        "orange"
      );
    },
  },
};
