const file = require("fs");

function one(input: number[], min: number, max: number) {
  const fuels: number[] = [];

  for (let i = min; i <= max; i++) {
    fuels.push(input.reduce((prev, curr) => prev + Math.abs(curr - i), 0));
  }

  return Math.min(...fuels);
}

const sum = (x) => (x === 0 ? 0 : x + sum(x - 1));

function two(input: number[], min: number, max: number) {
  const fuels: number[] = [];

  for (let i = min; i <= max; i++) {
    fuels.push(input.reduce((prev, curr) => prev + sum(Math.abs(curr - i)), 0));
  }
  return Math.min(...fuels);
}

file.readFile("./inputs/7.txt", "utf8", (_, data) => {
  const input = data.split(",").map((n) => parseInt(n));

  const [min, max] = [Math.min(...input), Math.max(...input)];
  //console.log(one(input, min, max));
  console.log(two(input, min, max));
});
