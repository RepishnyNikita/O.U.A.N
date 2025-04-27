import { rooms } from "./rooms.js";

// Генерация дома
export default function generateHouse() {
  const doorCount = Math.floor(Math.random() * 3) + 1;
  const windowCount = Math.floor(Math.random() * 3) + 4;
  const hasGarage = Math.random() < 0.8;
  const entryPoints = [];

  for (let i = 0; i < doorCount; i++) {
    entryPoints.push({
      type: "дверь",
      locked: Math.random() > 0.2,
      id: "door-" + Date.now() + "-" + Math.random().toString(36).substr(2, 5), //генерацияй случайного id
    });
  }

  for (let i = 0; i < windowCount; i++) {
    entryPoints.push({
      type: "окно",
      locked: Math.random() > 0.1,
      id:
        "window-" + Date.now() + "-" + Math.random().toString(36).substr(2, 5),
    });
  }

  if (hasGarage) {
    entryPoints.push({
      type: "гараж",
      locked: Math.random() > 0.2,
      id:
        "garage-" + Date.now() + "-" + Math.random().toString(36).substr(2, 5),
    });
  }

  let availableRooms = Object.keys(rooms);
  const roomCount = Math.min(6, Math.floor(Math.random() * 4) + 3); //рандомим комнаты в доме(число)
  let selectedRooms = [];

  for (let i = 0; i < roomCount; i++) {
    const randomIndex = Math.floor(Math.random() * availableRooms.length);//от 0 - 6
    selectedRooms.push(availableRooms[randomIndex]); //добавляем в масив
    availableRooms.splice(randomIndex, 1); //удаляем комнату из общего массива чтобы не было повторений
  }

  if (selectedRooms.length === 0) {
    selectedRooms = ["кухня", "гостиная", "спальня"];
  } 

  const targetItems = ["ваза", "кольцо", "алмаз"];

  const targetItem =
    targetItems[Math.floor(Math.random() * targetItems.length)];

  const generatedRooms = {};

  selectedRooms.forEach((roomName) => {
    const room = { ...rooms[roomName] }; //комнаты на заспавневшиеся дома
    if (roomName === "гараж") {
      if(Math.random() > 0.3){
        room.items = [];
        const tools = ["лом", "отмычка", "болторез"];
        const randomTool = tools[Math.floor(Math.random() * tools.length)];
        room.items.push(randomTool);
      }
      
      if (Math.random() > 0.5) {
        const secondItem = Math.random() > 0.5 ? "энергетик" : "деньги";
        room.items.push(secondItem);
      }
    } else if (roomName === "кухня") {
      room.items = [];
      const possibleItems = [...room.possibleItems];
      const itemCount = Math.floor(Math.random() * 3) + 1;

      for (let i = 0; i < itemCount; i++) {
        const randomIndex = Math.floor(Math.random() * possibleItems.length);
        room.items.push(possibleItems[randomIndex]);
        possibleItems.splice(randomIndex, 1);
      }
    }

    generatedRooms[roomName] = room; // наши комнаты на дома
  
  });

  return {
    entryPoints: entryPoints,
    rooms: generatedRooms,
    targetItem: {
      name: targetItem,
      room: selectedRooms[Math.floor(Math.random() * selectedRooms.length)],
    }
  };
}
