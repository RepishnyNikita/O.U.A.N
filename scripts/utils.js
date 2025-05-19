import { containerElements} from "./dom-elements.js";

export const clearLog = () => {
    containerElements.logContainer.innerHTML = "";
};

export const clearActions = () => {
    containerElements.actionsContainer.innerHTML = "";
};

export const addAction = (container, text, callback, className = "", img) => {
  if (!container || !(container instanceof HTMLElement)) {
    console.error("Контейнер не найден или не является DOM-элементом!");
    return;
  }
  const button = document.createElement("button");
  button.innerText = text;
  if (callback) {
    button.addEventListener('click',callback);
  }
  if (className) {
    button.className = className;
  }
  if (img) {
    const image = document.createElement("img");
    image.src = img;
    button.appendChild(image);
  }
  container.appendChild(button)

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


