const fs = require("node:fs");
const path = require("node:path");

const inputData = fs.readFileSync(path.join(__dirname, "input.txt"), "utf-8")

const numbers = inputData.split(/\s+/).map(Number).filter(n => !isNaN(n));

const firstList = numbers.filter((value, index) => index % 2 === 0)
const secondList = numbers.filter((value, index) => index % 2 !== 0)
const orderedFirstlist = firstList.sort((a, b) => a - b)
const orderedSecondlist = secondList.sort((a, b) => a - b)

let totalDistance = 0;

for (let index = 0; index < orderedFirstlist.length; index++) {
  totalDistance += Math.abs(orderedFirstlist[index] - orderedSecondlist[index])
}

console.log(`A distância total é de ${totalDistance}`);



let similarityScore = 0;

firstList.map((value, index) => {
  const count = secondList.reduce((acc, number) => number === value ? acc + 1 : acc, 0)
  similarityScore += count * value;
})

console.log(`A pontuação de similaridade é de ${similarityScore}`)