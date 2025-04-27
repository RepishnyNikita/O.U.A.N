import { ICON } from "./assets.js";
import { containerElements, buttonElements } from "./dom-elements.js";
import { game } from "./variables-game.js";

export const clearLog = () => {
    containerElements.logContainer.innerHTML = "";
};

export const clearActions = () => {
    containerElements.actionsContainer.innerHTML = "";
};

export const addAction = (text, callback, className = "", img) => {
  const button = document.createElement("button");
  button.innerText = text;
  if (callback) {
    button.onclick = callback;
  }
  if (className) {
    button.className = className;
  }
  if (img) {
    const image = document.createElement("img");
    image.src = img;
    button.appendChild(image);
  }
  containerElements.actionsContainer.appendChild(button);

  return button;
};

export const addToLog = (text, type ,icon) => {
  let className = "";
  switch(type){
    case "red" : className = "log__text--red-text"; break;
    case "green" : className = "log__text--green-text"; break;
    case "gray" : className = "log__text--gray-text"; break;
    case "yellow" : className = "log__text--yellow-text"; break;
    case "yellow-2" : className = "log__text--yellow-2-text"; break;
    case "orange" : className = "log__text--orange-text"; break;
    case "violet" : className = "log__text--violet-text"; break;
  }

  containerElements.logContainer.innerHTML += `
  <p class="log__text ${className}">- 
    ${text}
    <img src='${!icon ? '' : icon}' width='13'>
  </p>`;
  containerElements.logContainer.scrollTop = containerElements.logContainer.scrollHeight;
};

export const updateMoneyUI = () => {
  const moneyContainer = document.querySelector("[data-js-money]");
  const icon = document.createElement("img");
  icon.src = ICON.TOTAL_MONEY;
  moneyContainer.innerText = `$${game.economy.money.toLocaleString('en-US')}`;
  moneyContainer.appendChild(icon);
};

// Обновление таймера рынка в UI
export const updateMarketTimerUI = () => {
  //!ВЫНЕСТи
  document.querySelector("[data-js-black-market-timer]").textContent =
    game.marketTimer;
  document.querySelector("[data-js-sell-market-timer]").textContent =
    game.marketTimer;
};

export const showAndHideShop = () => {
  //!ВЫНЕСТи
  Object.assign(buttonElements.shopsButtons.style, {
    pointerEvents: !game.hiddenStore ? "all" : "none",
    opacity: !game.hiddenStore ? "1" : "0.7",
  });
};
