const file = require("fs");

var input: number[][];

function compare(x, y) {
  const point = input[y][x];
  const neighbors = [
    input[y - 1] !== undefined ? input[y - 1][x] : 9,
    input[y + 1] !== undefined ? input[y + 1][x] : 9,
    input[y][x + 1] !== undefined ? input[y][x + 1] : 9,
    input[y][x - 1] !== undefined ? input[y][x - 1] : 9,
  ];

  return neighbors.every((n) => point < n);
}

function one(input: number[][]) {
  const dangerRating: number[] = [];
  for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[0].length; x++) {
      if (compare(x, y)) dangerRating.push(input[y][x] + 1);
    }
  }
  return dangerRating.reduce((p, c) => p + c);
}

// flood fill from the minimas
function two() {}

file.readFile("./inputs/9.txt", "utf8", (_, data) => {
  input = data.split("\n").map((l) => l.split("").map((it) => parseInt(it)));
  input.pop();
  console.log(one(input));
});
