const fs = require("node:fs");
const path = require("node:path");

const inputData = fs.readFileSync(path.join(__dirname, "input.txt"), "utf-8");
const reportsArray = inputData.match(/mul\(\d{1,3}\,\d{1,3}\)/gm).map((mul) => mul.match(/(\d+),(\d+)/));

let total = 0;

reportsArray.forEach((numbers) => {
	firstNumber = +numbers[1];
	secondNumber = +numbers[2];

	total = total + firstNumber * secondNumber;
});

console.log(`O total é: ${total}`);

const mulRegex = /mul\((\d+),(\d+)\)/g;
const parts = inputData.split(/do\(\)|don't\(\)/);

let enabled = true;
let totalSum = 0;

parts.forEach((part, i) => {
	if (i > 0) {
		const previousSeparator = inputData.match(/do\(\)|don't\(\)/g)[i - 1];
		if (previousSeparator === "don't()") {
			enabled = false;
		} else if (previousSeparator === "do()") {
			enabled = true;
		}
	}

	let match;
  
	while ((match = mulRegex.exec(part)) !== null) {
		const [_, x, y] = match;
		if (enabled) {
			totalSum += parseInt(match[1]) * parseInt(match[2]);
		}
	}
});

console.log(`O total das somas habilitadas é: ${totalSum}`);
