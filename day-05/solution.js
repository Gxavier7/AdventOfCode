const fs = require("node:fs");
const { release } = require("node:os");
const path = require("node:path");

const inputData = fs.readFileSync(path.join(__dirname, "input.txt"), "utf-8");
const rules = inputData.match(/\d+\|\d+/gm);
const pageNumbers = inputData.match(/^\d+(?:,\d+)*$/gm)
let rulesObject = {};

rules.forEach(rule => { 
  const firstNumber = rule.match(/\d+(?=\|)/gm)[0];
  
  if( !rulesObject[firstNumber] ){
    rulesObject[firstNumber] = rules.filter(rule => rule.match(/\d+(?=\|)/gm)[0] == firstNumber).map(rule => rule.match(/(?<=\|)\d+/gm)[0]);
  }
})

const verifyPageOrders = (pagesArray) => {
  let correctlyPages = [];

  for (let i = 0; i < pagesArray.length; i++) {
    const element = pagesArray[i].match(/\d+/gm);

    isPageCorrectly = checkNumbers(element);

    if (isPageCorrectly) correctlyPages.push(element);
  }

  return correctlyPages;
}

const checkNumbers = ( list ) => {
  isListValid = true;

  for (let i = 0; i < list.length - 1; i++) {
    for (let j = i+1; j < list.length; j++) {
      if (!rulesObject[list[i]].includes(list[j]) ) {
        isListValid = false;
      }
    }  
  }

  return isListValid;
}

const correctlyPages = verifyPageOrders(pageNumbers)

let total = 0;
correctlyPages.forEach(pageList => {  
  total += +pageList[Math.round(pageList.length/2)-1]
})

console.log(total)
