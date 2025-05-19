import { ICON } from "./assets.js";
import { game } from "./variables-game.js";

const modal = document.querySelector("[data-js-statistics-modal]");
const content = document.querySelector("[data-js-statistics-modal-content]");
const btnOpenModal = document.querySelector("[data-js-statistics-modal-open]");
const btnCloseModal = document.querySelector("[data-js-statistics-modal-close]");
let isOpen = false

// Показать статистику
export const showStatsModal = () => {
    content.innerHTML = "";
    modal.showModal()
    modal.classList.add('is-open')
    generateRegularStats();

    btnCloseModal.addEventListener("click", ()=> {
      modal.classList.remove('is-open')
      modal.close()
    });
    modal.addEventListener('close', () =>{
      modal.classList.remove("is-open");
      isOpen = false
    })
}


// function restartGame(){
//   localStorage.removeItem("robberSave")
//   window.location.reload()
// }

const STATS_CONFIG = [
  {title:'Заработано с грабежей: ', getValue: () => game.economy.totalMoney},
  {title:'Потрачено на предметы: ', getValue: () => game.economy.spentOnPurchase},
  {title:'Украденных предметов всего: ',getValue: () => game.globalItemTake},
  {title:'Украденных целевых предметов: ',getValue: () => game.globalTargetItemTake},
  {title:'Использованно энергетиков: ',getValue: () => game.totalUseEnergy},
  {title:'Открыто сейфов: ',getValue: () => game.safesOpened},
  {title:'Проникновенний в дом: ',getValue: () => game.penetrationInHouse},
  {title:'Успешные грабежи: ',getValue: () => game.successfulHeists},
  {title:'Общий долг перед полицией: ',getValue: () => game.police.totalDebt},
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

const generateRegularStats = () => {
  content.innerHTML = `
    <h2 class="h5">Cтатистика текущей игры</h2>
  `
  content.appendChild(createElementsStats())
  
  return content
};




