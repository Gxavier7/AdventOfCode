const fs = require("node:fs");
const path = require("node:path");

const inputData = fs.readFileSync(path.join(__dirname, "input.txt"), "utf-8");
const equationsArray = inputData.split('\n').map(line => line.split(/[: ]/).filter(Boolean))
let operators = ["+", "*"]
let possibleEquations = []

const generateOperatorsoptions = (operators, length) => {
  if (length === 0) return [[]];
  const smallerOptions = generateOperatorsoptions(operators, length - 1);
  return smallerOptions.flatMap(combo => 
    operators.map(op => [...combo, op])
  );
}

for (let i = 0; i < equationsArray.length; i++) {
  const equation = equationsArray[i];
  const equationResult = Number(equation[0])
  
  let operatorsOptions = generateOperatorsoptions(operators, equation.length - 2)  

  for (let i = 0; i < operatorsOptions.length; i++) {
    const operatorsArray = operatorsOptions[i];
    let total = Number(equation[1])
    
    for (let index = 1; index < equation.length - 1; index++) {
      const nextNumber = Number(equation[index + 1]);
      const currentOperator = operatorsArray[index -1]

      if (currentOperator === "+") {
        total += nextNumber;
      } else if (currentOperator === "*") {
        total *= nextNumber;
      }
    }
    
    if (equationResult == total) {
      possibleEquations.push(total)
      break
    }
  };
}

let fullSum = 0

for (let index = 0; index < possibleEquations.length; index++) {
  fullSum += possibleEquations[index]
}

console.log(`A soma das equações que são possíveis é ${fullSum}`);

// Part 2

operators = ["+", "*", "||"]
possibleEquations = []

for (let i = 0; i < equationsArray.length; i++) {
  const equation = equationsArray[i];
  const equationResult = Number(equation[0])
  
  let operatorsOptions = generateOperatorsoptions(operators, equation.length - 2)  

  for (let i = 0; i < operatorsOptions.length; i++) {
    const operatorsArray = operatorsOptions[i];
    let total = Number(equation[1])
    
    for (let index = 1; index < equation.length - 1; index++) {
      const nextNumber = Number(equation[index + 1]);
      const currentOperator = operatorsArray[index -1]

      if (currentOperator === "+") {
        total += nextNumber;
      } else if (currentOperator === "*") {
        total *= nextNumber;
      } else if (currentOperator === "||") {
        total = Number(total.toString() + equation[index + 1]);
      }
    }
    
    if (equationResult == total) {
      possibleEquations.push(total)
      break
    }
  };
}

fullSum = 0

for (let index = 0; index < possibleEquations.length; index++) {
  fullSum += possibleEquations[index]
}

console.log(`A soma das equações que são possíveis com o operador OU é ${fullSum}`);