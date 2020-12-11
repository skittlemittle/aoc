const fs = require("fs");

let WIDTH, HEIGHT;

const states = { floor: ".", empty: "L", full: "#" };

// all eight adjacent neighbors
function getNeighborsV1(grid, x, y) {
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

function raycast(grid, x, y, xstep, ystep) {
  let hit = false;
  while(!hit) {
    x += xstep;
    y += ystep;
    if (y < 0 || y >= WIDTH || x < 0 || x >= HEIGHT) break;

    const tile = grid[x][y];
    if (tile === states.full) {
      hit = states.full;
    } else if (tile == states.empty) {
      hit = states.empty;
    }
  }
  return hit;
}

function getNeighbors(grid, x, y) {
  const neighbors = [];
  neighbors.push(raycast(grid, x, y, -1, 0)); //up
  neighbors.push(raycast(grid, x, y, 1, 0)); //down
  neighbors.push(raycast(grid, x, y, 0, 1)); //right?
  neighbors.push(raycast(grid, x, y, 0, -1)); //left?
  //slanty bois
  neighbors.push(raycast(grid, x, y, -1, -1));
  neighbors.push(raycast(grid, x, y, -1, 1));
  neighbors.push(raycast(grid, x, y, 1, -1));
  neighbors.push(raycast(grid, x, y, 1, 1));

  return neighbors.filter(it => it !== false);
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
      } else if (state === states.full && neighbors.filter(n => n === states.full).length >= 5) {
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

  console.log(input);

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
