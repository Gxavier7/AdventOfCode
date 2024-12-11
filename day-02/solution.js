const fs = require("node:fs");
const path = require("node:path");

const inputData = fs.readFileSync(path.join(__dirname, "input.txt"), "utf-8")

const reportsArray = inputData.split(`\n`).map(line => line.split(' ').map(Number));

const verifyReport = (report) => {
  let increase = true;
  let decrease = true;
  const diference = [1,2,3]

  for (let i = 0; i < report.length - 1; i++) {
    const number = report[i];
    const nextNumber = report[i + 1];

      if (number > nextNumber) increase = false
      if (number < nextNumber) decrease = false
      if (!diference.includes(Math.abs(number - nextNumber))) return false
  }

  return increase || decrease
}

// Part 1 Solution
const safeReports = reportsArray.filter(verifyReport)

console.log(`A quantidade de relatórios seguros é: ${safeReports.length} `)


// Part 2 Solution
const safeReportsCorrect = reportsArray.filter(report => {
  if (verifyReport(report)) return true

  for (let i = 0; i < report.length; i++) {
    if (verifyReport(report.slice(0, i).concat(report.slice(i + 1)))) return true;
  }

  return false
})

console.log(`A quantidade de relatórios seguros conferidos novamente é: ${safeReportsCorrect.length} `)
