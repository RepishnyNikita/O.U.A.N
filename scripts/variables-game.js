export const game = {
    energy:{
        currentEnergy: 15,
        maxEnergy: 15,
        energyRegenInterval: null,
        energyRegenTimer: 60,
    },
    economy:{
        money: 1000,
        totalMoney: 0,
        debtPaid: 0,
        baseFine:1000,
        totalDebt: 80000,
        maxDebt: 80000,
        spentOnPurchase:0
    },
    events:{
        activeEvent: null,
        eventTimer: null,
        policeCalled: false,
        partyHouse: false,
        isNoticed:false,
        moneySpawned: false,
        unlockedDoor:false
    },
    police:{
        currentDebt:0,
        totalDebt: 0,
        numberOfArrests: 0,
        baseFine: 500,
        maxDebt: 10000,
    },
    market:{
        sell:false,
        buy:false,
    },

    inventory:{
        backpack: ['отмычка','отмычка','отмычка','ваза'],
        belt:['отмычка','отмычка','отмычка','камень'],
        backpackSlots: 4,
        beltSlots: 4,
        maxBackpackSlots: 12,
    },

    startRobbery:false,
    timeLeft: 480,
    currentHouse: null,
    checkedDoors: [],
    currentRoom: null,
    visitedRooms: [],
    usedEntryPoint: null,

    totalUseEnergy:0,
    
    targetItem: null, 
    targetItemFound: false,
    globalItemTake: 0,
    globalTargetItemTake: 0,
    safesOpened:0,

    gameInterval: null,
    lastSoldItem: null,
    lastSaleResult: null,

    successfulHeists: 0,
    totalLoot: 0,
    penetrationInHouse:0,

    marketTimer: 0, 
    market:{},
    marketInterval: null, 

    hiddenStore: false,
};
