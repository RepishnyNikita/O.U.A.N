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
  container.classList.remove(...className);
  container.classList.add(newClass);
};
