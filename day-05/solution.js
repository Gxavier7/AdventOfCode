const fs = require("node:fs");
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
  let correctPages = [];
  let incorrectPages = [];

  for (let i = 0; i < pagesArray.length; i++) {
    const list = pagesArray[i].match(/\d+/gm);

    pageResult = checkNumbers(list);    
    
    if ( typeof pageResult !== "string") correctPages.push(list);
    else incorrectPages.push({
      list,
      number: pageResult
    });
  }

  return {correctPages, incorrectPages};
}

const checkNumbers = ( list ) => {
  let validList = true;
  let wrongPage;
  
  for (let i = 0; i < list.length - 1; i++) {
    for (let j = i+1; j < list.length; j++) {
      if (!rulesObject[list[i]].includes(list[j]) ) {
        wrongPage = list[i];
      }
    }  
  }

  return wrongPage || validList;
}

const verifiedPagesArray = verifyPageOrders(pageNumbers)

let total = 0;
verifiedPagesArray.correctPages.forEach(pageList => {  
  total += +pageList[Math.round(pageList.length/2)-1]
})
 
console.log(`O total da soma das medianas das listas corretas é: ${total}`)

// Part 2

const fixIncorrectPages = (incorrectList) => {
  let fixedPagesArray = [];
  const list = incorrectList.list;
  const number = incorrectList.number;
  const index = list.indexOf(number);

  for (let i = 0; i < list.length - 1; i++) {
    if (rulesObject[number].includes(list[i + 1]) ) {
      list.splice(index, 1);
      list.splice(i + 1, 0, number);
      fixedPagesArray.push({
        list,
        number
      });
      return fixedPagesArray;
    }
  }

  list.splice(index, 1);
  list.splice(list.length, 0, number);
  fixedPagesArray.push({
    list,
    number
  });
  return fixedPagesArray
}

let fixedPagesArray = verifiedPagesArray.incorrectPages.map(wrongObject => fixIncorrectPages(wrongObject));
let incorrectPagesSum = 0;

while (fixedPagesArray.length !== 0) {
  fixedPagesArray.map( (element, index) => {
    const object = element[0];
    const list = object.list
    const checkResult = checkNumbers(list);
  
    if (checkResult === true) {
      incorrectPagesSum += +list[Math.round(list.length/2)-1];
      fixedPagesArray.splice(index, 1);
      
    } else {
      fixedPagesArray[index] = fixIncorrectPages({list, number: checkResult});
    }
  })
}

console.log(`O total da soma da mediana das listas corrigidas é: ${incorrectPagesSum}`)
