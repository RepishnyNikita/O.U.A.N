import { ICON } from "./assets.js";
import { game } from "./variables-game.js";

const modal = document.querySelector("[data-js-statistics-modal]");
const content = document.querySelector("[data-js-statistics-modal-content]");
const btnOpenModal = document.querySelector("[data-js-statistics-modal-open]");
const btnRestartGame = document.querySelector("[data-js-restart-game]");
const btnCloseModal = document.querySelector(
  "[data-js-statistics-modal-close]"
);
let isOpen = false

// Показать статистику
export const openStatsModal = (isFinal, result) => {
  content.innerHTML = "";
  if (isFinal) {
    generateFinalStat(result);
    modal.showModal();
    modal.classList.add("is-open");
    btnRestartGame.style.display = "block";
    btnCloseModal.style.display = 'none'
    // isOpen = true
    btnRestartGame.addEventListener("click", restartGame);
    return
  } else {
    generateRegularStats();
    btnCloseModal.style.display = 'block'
    btnRestartGame.style.display = "none";
    btnCloseModal.addEventListener("click", handleClick);
    modal.addEventListener('close', () =>{
      modal.classList.remove("is-open");
      isOpen = false
    })
  }
};

function handleClick(){
  if(!isOpen){
    modal.showModal();
    modal.classList.add("is-open");
    openStatsModal()
    isOpen = true
  }else{
    modal.classList.remove("is-open");
    modal.close();
    isOpen = false
  }
}

function restartGame(){
  localStorage.removeItem("robberSave")
  window.location.reload()
}

const STATS_CONFIG = [
  {title:'Заработано с грабежей: ', getValue: () => game.economy.totalMoney},
  {title:'Общий долг перед полицией: ',getValue: () => game.police.totalDebt},
  {title:'Украденных предметов всего: ',getValue: () => game.globalItemTake},
  {title:'Украденных целевых предметов: ',getValue: () => game.globalTargetItemTake},
  {title:'Использованно энергетиков: ',getValue: () => game.totalUseEnergy},
  {title:'Открыто сейфов: ',getValue: () => game.safesOpened},
  {title:'Проникновенний в дом: ',getValue: () => game.penetrationInHouse},
  {title:'Успешные грабежи: ',getValue: () => game.successfulHeists},
  {title:'Пойман полицией: ',getValue: () => game.police.numberOfArrests},
]

const createElementsStats = () =>{
  const list = document.createElement('ul')
  list.classList.add('statistics-modal-list')

  STATS_CONFIG.forEach(item =>{
    const li = document.createElement('li')
    li.classList.add('statistics-modal-item')
    li.innerHTML = `
      <span>${item.title}</span>
      <span>${item.getValue()}</span>
    `
    list.appendChild(li)
  })
  return list
}

const generateFinalStat = (result) => {
  content.innerHTML = 
  `
    <div class="statistics-modal-header">
      <h2 class="h5">${result === 'victory'  ? 'Вы успешно расчитались с долгом': 'Вас посадили в тюрьму'}</h2>
      <img src=${result === 'lose' ? ICON.PRISON : ''}>
    </div>
    <p>Ваш результат за всю игру</p>
  `

  content.appendChild(createElementsStats())
  return content
};

const generateRegularStats = () => {
  content.innerHTML = `
    <h2 class="h5">Cтатистика текущей игры</h2>
  `
  content.appendChild(createElementsStats())
  
  return content
};

btnOpenModal.addEventListener("click", handleClick);


