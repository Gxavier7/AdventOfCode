const fs = require("node:fs");
const path = require("node:path");

const inputData = fs.readFileSync(path.join(__dirname, "input.txt"), "utf-8");
let labMap = inputData.split("\n").map(line => line.split(''))

const findPosition = () => {
  for (let y = 0; y < labMap.length; y++) {
    const line = labMap[y];
    for (let x = 0; x < line.length; x++) {
      const object = line[x];
      
      if (["^", ">", "<", "V"].includes(object)) return {x, y, object}
    }
  }
}

const getFrontPosition = (position) => {
 

  if(position.y - 1 < 0 || position.x + 2 == labMap[0].length || position.y + 2 > labMap.length || position.x - 1 < 0) {
    labMap[currentPosition.y][currentPosition.x] = "X"
    return {x: labMap[0].length, y: labMap.length, object: undefined}
  }
  
  switch (position.object) {
    case "^":
      return {...position, y: position.y - 1, object: labMap[position.y - 1][position.x]}
      
    case ">":
      return {...position, x: position.x + 1, object: labMap[position.y][position.x + 1]}
      
    case "V":
      return {...position, y: position.y + 1, object: labMap[position.y + 1][position.x]}

    case "<":
      return {...position, x: position.x - 1, object: labMap[position.y][position.x - 1]}
  }
}

let currentPosition = findPosition()
let frontPosition = getFrontPosition(currentPosition)


const rotateGuard = () => {
  switch (currentPosition.object) {
    case "^":
      currentPosition.object = ">";
    break;
      
    case ">":
      currentPosition.object = "V";
    break;
    
    case "V":
      currentPosition.object = "<";
    break;
  
    case "<":
      currentPosition.object = "^";
    break;
  }
}

const walk = () => {
  if (frontPosition.object != "#"){
    labMap[currentPosition.y][currentPosition.x] = "X"
    currentPosition = {...frontPosition, object: currentPosition.object}
  } 
  else {
    rotateGuard()
  }  
  
  frontPosition = getFrontPosition(currentPosition)
  return currentPosition
}

while (frontPosition.y < labMap.length || frontPosition.x < labMap[0].length) {
  walk()
}

let visitedPositions = 0

for (let y = 0; y < labMap.length; y++) {
  const line = labMap[y];
  for (let x = 0; x < line.length; x++) {
    const object = line[x];
    
    if (object == "X") visitedPositions++
  }
}

console.log(`O guarda visitou ${visitedPositions} posições`);

