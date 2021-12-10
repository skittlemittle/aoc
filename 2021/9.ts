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

type point = { x: number; y: number };
const height = (p: point) => input[p.y][p.x];
const mark = (p: point) => (input[p.y][p.x] = -1);

const neighbors: point[] = [
  { x: 1, y: 0 },
  { x: -1, y: 0 },
  { x: 0, y: 1 },
  { x: 0, y: -1 },
];

function floodBasin(point: point, basin: point[]) {
  basin.push(point);
  mark(point);
  const n = neighbors
    .map((neighbor) => {
      const x = point.x + neighbor.x;
      const y = point.y + neighbor.y;
      if (x >= 0 && x < input[0].length && y >= 0 && y < input.length) {
        return { x, y };
      }
      return undefined;
    })
    .filter((p) => p !== undefined);

  n.forEach((p) => {
    if (height(p) < 9 && height(p) >= 0) floodBasin(p, basin);
  });
  return basin;
}

// flood fill
function two(minimas: point[]) {
  const sizes = minimas.map((point) => floodBasin(point, []).length);
  return sizes
    .sort((a, b) => a - b)
    .splice(sizes.length - 3)
    .reduce((p, c) => p * c);
}

file.readFile("./inputs/9.txt", "utf8", (_, data) => {
  input = data.split("\n").map((l) => l.split("").map((it) => parseInt(it)));
  input.pop();
  console.log(one(input));

  const minimas: point[] = [];
  for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[0].length; x++) {
      if (compare(x, y)) minimas.push({ x, y });
    }
  }
  console.log(two(minimas));
});
