export const game = {
    energy:{
        currentEnergy: 15,
        maxEnergy: 15,
        energyRegenInterval: null,
        energyRegenTimer: 60,
    },
    economy:{
        money: 80000,
        totalMoney: 0,
        debtPaid: 0,
        baseFine:1000,
        totalDebt: 80000,
        maxDebt: 80000,
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


    timeLeft: 480,
    inventory: ['энергетик','отмычка'],
    inventorySlots: 10,

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

    marketTimer: 120, 
    marketModifiers: {}, 
    sellMarketModifiers: {}, 
    marketInterval: null, 
    hiddenStore: false,
};
