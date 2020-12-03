// tree counting m yes
const fs = require("fs");

let WIDTH, HEIGHT;

// wrap around x axis coz it "repeats" or smth
const tileAt = (x, y, input) => input[y][x % WIDTH];

function one(input, xAdd, yAdd) {
  let x = 0;
  let y = 0;
  let treeCount = 0;

  while (y < HEIGHT) {
    if (tileAt(x, y, input) === "#") treeCount++;

    y += yAdd;
    x += xAdd;
  }
  return treeCount;
}

function two(input) {
  let res = 1;
  // [[x,y]]
  const slopes = [
    [1, 1],
    [3, 1],
    [5, 1],
    [7, 1],
    [1, 2],
  ];

  slopes.forEach((s) => (res *= one(input, s[0], s[1])));
  return res;
}

fs.readFile("./inputs/3.txt", "utf8", (_, data) => {
  const input = [...data.split("\n")];
  WIDTH = input[0].length;
  HEIGHT = input.length;
  console.log(one(input, 3, 1));
  console.log(two(input));
});
