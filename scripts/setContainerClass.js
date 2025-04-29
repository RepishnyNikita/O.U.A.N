const className = [
  "actions-container--column",
  "actions-container--grid",
  "actions-container--grid-auto-fit",
];

export const setContainerClass = (newClass) => {
  const container = document.querySelector("[data-js-actions-container]");
  if (!newClass) {
    container.classList.remove(...className);
    return;
  }
  if(newClass === 'actions-container--grid'){
    container.style.backgroundImage = 'url("./image/bg-3.jpg")'
  }
  if(newClass === 'actions-container--column'){
    container.style.backgroundImage = 'url("./image/bg-2.jpg")'
  }
 
  container.classList.remove(...className);
  container.classList.add(newClass);
};
