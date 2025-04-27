import { ICON } from "../assets.js";

export const entryTypes = {
    "дверь": { 
        energyCost: 1,
        checkEnergyCost: 1,
        exitEnergyCost: 1,
        timeCost: 10,
        locked: true,
        tools: ["отмычка","лом"],
        description: "дверь",
        icon:ICON.DOOR,
        toolCosts: {
            "отмычка": { energy: 1, time: 60 },
            "лом": { energy: 2, time: 20 }
        }
    },
    "окно": {
        energyCost: 1,
        checkEnergyCost: 1,
        exitEnergyCost: 1,
        timeCost: 30,
        locked: true,
        tools: ["лом","камень"],
        description: "окно",
        icon:ICON.WINDOW,
        toolCosts: {
            "лом": { energy: 2, time: 20 },
            "камень": { energy: 3, time: 120 }
        }
    },
    "гараж": {
        energyCost: 1,
        checkEnergyCost: 1,
        exitEnergyCost: 1,
        timeCost: 15,
        locked: true,
        tools: ["болторез"],
        description: "гараж",
        icon:ICON.GARAGE,
        toolCosts: {
            "болторез": { energy: 2, time: 45 }
        }
    }
};