export const items = {
    "пачка денег": { icon:'icon/icons-of-valuables/more-money.png'},
    "деньги": { icon:'icon/icons-of-valuables/money.png', price: 600},
    "кольцо": { icon:'icon/icons-of-valuables/ring.png',price: 900},
    "ваза": { icon:'icon/icons-of-valuables/vase.png',price: 400},
    "алмаз": { icon:'icon/icons-of-valuables/diamond.png',price: 1400, isRare: 'rare'},

    "лом": {  icon:'icon/tool/tool.png',price: 100, type: "tool", consumable: true ,description:'средство взлома'},//Расходник
    "декодер": {  icon:'icon/tool/decoder.png',price: 100, type: "tool", consumable: true ,description:'средство взлома'},//Расходник
    "отмычка": { icon:'icon/tool/lockpick.png', price: 100, type: "tool", consumable: true,description:'средство взлома' },//Расходник
    "болторез": { icon:'icon/tool/bolt-cutter.png',price: 100, type: "tool", consumable: true,description:'средство взлома (гараж)' },//Расходник
    "энергетик": { icon:'icon/uiIcon/energy.png',price: 100, type: "consumable", effect: { energy: 3 }, consumable: true,description:'восполнит энергию' },//Расходник
    "камень": { icon:'icon/stone.png',consumable: true,description:'средство взлома (окно)' },

    "документы": {  icon:'icon/icons-of-valuables/document.png', type: "target" },
    "ноутбук": { icon:'icon/icons-of-valuables/laptop.png', type: "junk" },
    "украшения": { icon:'icon/icons-of-valuables/decorations.png', type: "junk" },
    "часы": { icon:'icon/icons-of-valuables/clock.png', type: "junk" },
    "антиквариат": { icon:'icon/icons-of-valuables/antiques.png', type: "junk" },
    "картина": { icon:'icon/icons-of-valuables/picture.png', type: "junk" },
    "нож": { icon:'icon/icons-of-valuables/knife.png', type: "junk" },
    
};