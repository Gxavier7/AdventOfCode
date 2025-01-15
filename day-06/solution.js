const fs = require("node:fs");
const path = require("node:path");

const inputData = fs.readFileSync(path.join(__dirname, "input.txt"), "utf-8");
const labMapBackup = inputData.split("\n").map(line => line.split(''));

const getMap = () => JSON.parse(JSON.stringify(labMapBackup));

let guard;
let guardFront;
let visitedPositions = 0;
let labMap = getMap()
const maxLineNumbers = labMapBackup.length // 130
const maxColumnsNumbers = labMapBackup[0].length //131
const directions = ["^",">","V","<"]

const getInitialPosition = () => {
  for (let lineIndex = 0; lineIndex < labMapBackup.length; lineIndex++) {
    const line = labMapBackup[lineIndex];
    for (let columnIndex = 0; columnIndex < line.length; columnIndex++) {
      const column = line[columnIndex];
      if (directions.includes(column)) {
        return {line: lineIndex, column: columnIndex, direction: column };
      }
    }
  }
}

const existFrontPosition = (position) => {
  
  return (position.line < maxLineNumbers && position.column < maxColumnsNumbers && position.line >= 0 && position.column >= 0)
}

const existGuardPosition = (position) => {
  return (position.line < maxLineNumbers - 1 && position.column < maxColumnsNumbers - 1 && position.line > 0 && position.column > 0)
}

const getGuardFront = () => {  
  if (!existGuardPosition(guard)) {
    return {line: -1, column: -1}
  }

  switch (guard.direction) {
    case "^":
      return {line: guard.line - 1, column: guard.column}

    case ">":
      return {line: guard.line, column: guard.column + 1}

    case "V":
      return {line: guard.line + 1, column: guard.column}
      
    case "<":
      return {line: guard.line, column: guard.column -1}
  }
}

const walk = (map, increaseLine = false) => {
  const currentPosition = map[guard.line][guard.column]

  if (increaseLine) {    
    map[guard.line][guard.column] = currentPosition == "." ? "X" : currentPosition + "X"
  } else{
    map[guard.line][guard.column] = "X"
  }
  
  guard = {...guardFront, direction: guard.direction}
  guardFront = getGuardFront(guard)  
}

const rotate = () => {
  switch (guard.direction) {
    case "^":
      guard.direction = ">";
    break;
    case ">":
      guard.direction = "V";
    break;  
    case "V":
      guard.direction = "<";
    break;
    case "<":
      guard.direction = "^";
    break;
  }
}

guard = getInitialPosition()
guardFront = getGuardFront(guard)

while (existFrontPosition(guardFront)) {
  if(labMap[guardFront.line][guardFront.column] != "#"){
    walk(labMap)
  } else {
    rotate()
    guardFront = getGuardFront(guard)
  }
}

for (let lineIndex = 0; lineIndex < labMapBackup.length; lineIndex++) {
  const line = labMap[lineIndex];
  for (let columnIndex = 0; columnIndex < line.length; columnIndex++) {
    const column = line[columnIndex];
    
    if (column == "X") {
      visitedPositions++
    }
  }
}



console.log(`O guarda visitou ${visitedPositions + 1} posições`);

// Part 2 

let mapWithAllBarriers = getMap()
let oneBarrierMap;
let possibleBarriers = 0

for (let line = 0; line < maxLineNumbers; line++) {
  for (let column = 0; column < maxColumnsNumbers - 1; column++) {
    oneBarrierMap = getMap()

    if (!["#", "^"].includes(oneBarrierMap[line][column])) {
      oneBarrierMap[line][column] = "O"
      guard = getInitialPosition()      
      guardFront = getGuardFront(guard)
      let inLooping = false


      while (existFrontPosition(guardFront) && !inLooping) {
        
        const guardfrontObject = oneBarrierMap[guardFront.line][guardFront.column]

        if(!["#", "O"].includes(guardfrontObject)){
          walk(oneBarrierMap, true)
        } else {
          rotate()
          guardFront = getGuardFront(guard)
        }

        if (guardFront.line != -1) {
          if (oneBarrierMap[guardFront.line][guardFront.column].length >= 6 ) {
            mapWithAllBarriers[line][column] = "O"
            inLooping = true
            possibleBarriers++            
          }
        }
        
      }

    }
  }
}


let map2 = mapWithAllBarriers.map(row => row.join("")).join("\n");
fs.writeFileSync(path.join(__dirname, "output.txt"), map2, "utf-8");

console.log(`Existem ${possibleBarriers} possíveis barreiras para o guarda`);
