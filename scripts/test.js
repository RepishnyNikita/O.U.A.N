
const obg ={
   window: {
        energyCost: 1,
        checkEnergyCost: 1,
        exitEnergyCost: 2,
        timeCost: 30,
        locked: true,
        tools: ["лом","не лом"],
        description: "окно",
        toolCosts: {
            "лом": { energy: 2, time: 20 }
        }
    },
}

console.log(obg.window.description[0]);