import { rooms } from "./rooms.js";

// Генерация дома
export default function generateHouse() {
  const doorCount = Math.floor(Math.random() * 3) + 1;
  const windowCount = Math.floor(Math.random() * 3) + 4;
  const hasGarage = Math.random() < 0.6;
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
  console.log(rooms['кухня'].items);
  
  let availableRooms = Object.keys(rooms); //копируем комнаты
  const roomCount = Math.min(availableRooms.length, Math.floor(Math.random() * 5) + 3); //рандомим комнаты в доме(число)

  let selectedRooms = [];

  for (let i = 0; i < roomCount; i++) {
    const randomIndex = Math.floor(Math.random() * availableRooms.length);//от 0 - 6
    selectedRooms.push(availableRooms[randomIndex]); //добавляем в масив комнату
    availableRooms.splice(randomIndex, 1); //удаляем комнату из общего массива чтобы не было повторений
  }

  if (selectedRooms.length === 3) {
    if(hasGarage){
      selectedRooms = ["кухня", "гараж", "спальня"];
    }else{
      selectedRooms = ["кухня", "гостиная", "спальня"];
    }
  } 

  const targetItems = ["часы", "кольцо", "алмаз"];
  const targetItem = targetItems[Math.floor(Math.random() * targetItems.length)];

  const generatedRooms = {};

 
  selectedRooms.forEach((roomName) => {
    const room = structuredClone(rooms[roomName]); //комнаты на заспавневшиеся дома
    
    // if (roomName === rooms.garage.name) {
    //   if(Math.random() < 0.1){
    //     const randomTool = room.tools[Math.floor(Math.random() * room.tools.length)];
    //     const possibleItems = room.possibleItems[Math.floor(Math.random() * room.possibleItems.length)];
    //     Math.random() < 0.1 && room.items.push(randomTool);
    //     Math.random() < 0.1 && room.items.push(possibleItems)
    //   }
    // }

    generatedRooms[roomName] = room; // наши комнаты на дома
    console.log(generatedRooms[roomName].items);
  });

  console.log('ГЕНЕРАЦИЯ');
  return {
    entryPoints: entryPoints,
    rooms: generatedRooms,
    targetItem: {
      name: targetItem,
      room: selectedRooms[Math.floor(Math.random() * selectedRooms.length)],
    }
  };
}
