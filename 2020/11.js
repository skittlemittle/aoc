const fs = require("fs");

let WIDTH, HEIGHT;

const states = { floor: ".", empty: "L", full: "#" };

// all eight adjacent neighbors
function getNeighbors(grid, x, y) {
  const neighbors = [];
  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      let r = (x + i);
      let c = (y + j);
      if (c < 0 || c >= WIDTH || r < 0 || r >= HEIGHT) {
        neighbors.push(states.floor); // edges are floor innit
      } else {
        neighbors.push(grid[r][c]);
        if (i === 0 && j === 0) neighbors.pop();
      }
    }
  }
  return neighbors;
}

function one(input) {
  // copying what a noob
  const next = [...Array(HEIGHT)].map(() => (new Array(WIDTH)));
  let changed = false;

  for (let x = 0; x < HEIGHT; x++) {
    for (let y = 0; y < WIDTH; y++) {
      const neighbors = getNeighbors(input, x, y);
      const state = input[x][y];

      if (state === states.empty && !neighbors.includes(states.full)) {
        next[x][y] = states.full;
        changed = true;
      } else if (state === states.full && neighbors.filter(n => n === states.full).length >= 4) {
        next[x][y] = states.empty;
        changed = true;
      } else {
        next[x][y] = state;
      }
    }
  }
  return{ next, changed };
}

fs.readFile("inputs/11.txt", "utf8", (_, data) => {
  const input = [...data.split("\n")];
  input.splice(-1, 1);
  WIDTH = input[0].length;
  HEIGHT = input.length;

  let curr = [...input];
  while (true) {
    const { next, changed } = one(curr);
    curr = [...next];
    if (!changed) break;
  }

  const count = [];
  for (i of curr) count.push(...i.filter(i => i === states.full));
  console.log(count.length);
});
