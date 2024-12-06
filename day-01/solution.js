const fs = require("node:fs");
const path = require("node:path");

const inputData = fs.readFileSync(path.join(__dirname, "input.txt"), "utf-8")

const numbers = inputData.split(/\s+/).map(Number).filter(n => !isNaN(n));

const orderedFirstlist = numbers.filter((value, index) => index % 2 === 0).sort((a, b) => a - b)
const orderedSecondlist = numbers.filter((value, index) => index % 2 !== 0).sort((a, b) => a - b)

let totalDistance = 0;

for (let index = 0; index < orderedFirstlist.length; index++) {
  totalDistance += Math.abs(orderedFirstlist[index] - orderedSecondlist[index])
}

console.log(`A distância total é de ${totalDistance}`);