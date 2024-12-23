const fs = require("node:fs");
const path = require("node:path");

const inputData = fs.readFileSync(path.join(__dirname, "input.txt"), "utf-8");
const inputLinesArray = inputData.trim().split(`\n`);

const verifyDiagonals = () => {
  let diagonalsRepeats = [];

  for (let i = 0; i < inputLinesArray.length - 3; i++) {
    for (let j = 0; j < inputLinesArray[i].length; j++) {
      let diagonalValid = false;

      if (j <= (inputLinesArray[i].length - 4)) { 
        const diagonal = inputLinesArray[i][j] + inputLinesArray[i+1][j+1] + inputLinesArray[i+2][j+2] + inputLinesArray[i+3][j+3];

        
        
        if (diagonal == "XMAS" || diagonal == "SAMX") {
          diagonalValid = true;
          diagonalsRepeats.push({
            line: `${i}, ${i + 1}, ${i + 2}, ${i+3} `,
            column: `${j}, ${j + 1}, ${j + 2}, ${j+3} `,
            diagonal: diagonal
          });
        }
      }

      if (j >= 3) {
        const diagonal = inputLinesArray[i][j] + inputLinesArray[i+1][j-1] + inputLinesArray[i+2][j-2] + inputLinesArray[i+3][j-3];
        if (diagonal == "XMAS" || diagonal == "SAMX") {
          diagonalValid = true;
          diagonalsRepeats.push({
            line: `${i}, ${i + 1}, ${i + 2}, ${i+3} `,
            column: `${j}, ${j - 1}, ${j - 2}, ${j-3} `,
            diagonal: diagonal
          });
        }
      }
    }
  }
  
  return diagonalsRepeats;
}

const verifyVertical = () => {
  let verticalRepeats = [];

  for (let i = 0; i < inputLinesArray.length - 3; i++) {
    for (let j = 0; j < inputLinesArray[i].length; j++) {

      let verticalValid = false;
      const vertical = inputLinesArray[i][j] + inputLinesArray[i+1][j] + inputLinesArray[i+2][j] + inputLinesArray[i+3][j];

      if (vertical == "XMAS" || vertical == "SAMX") {
        verticalValid = true;
        verticalRepeats.push({
          line: `${i}, ${i + 1}, ${i + 2}, ${i+3} `,
          column: `${j}`,
          vertical: vertical
        });
      }
    }
  }

  return verticalRepeats;
}

const horizontalRepeats = [...inputData.match(/XMAS/g), ...inputData.match(/SAMX/g)];
const diagonalRepeats = verifyDiagonals();
const verticalRepeats = verifyVertical();

const total = horizontalRepeats.length + diagonalRepeats.length + verticalRepeats.length;

console.log(`A quantidade de repetições de XMAS no caça palavras é ${total}`)