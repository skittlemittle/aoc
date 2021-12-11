const file = require("fs");

// the octopus grid, (y, x)
type point = { y: number; x: number };

interface Octopi {
  grid: number[][];
  flashCount: number;
}

const neighbors: point[] = [
  { y: -1, x: -1 },
  { y: 0, x: -1 },
  { y: 1, x: -1 },
  { y: -1, x: 0 },
  { y: 1, x: 0 },
  { y: -1, x: 1 },
  { y: 0, x: 1 },
  { y: 1, x: 1 },
];

const getNeighbors = (y: number, x: number, grid: number[][]): point[] =>
  neighbors
    .map((n) => {
      const p = { y: y + n.y, x: x + n.x };
      if (p.x < 0 || p.x >= grid[0].length || p.y < 0 || p.y >= grid.length)
        return undefined;
      return p;
    })
    .filter((p) => p !== undefined);

/** simulate a single flash */
function simulateOctopusRave(octopi: Octopi, y: number, x: number) {
  octopi.grid[y][x]++;
  if (octopi.grid[y][x] === 10) {
    octopi.flashCount++;
    getNeighbors(y, x, octopi.grid).forEach(
      (n) => (octopi = simulateOctopusRave(octopi, n.y, n.x))
    );
  }
  return octopi;
}

/** counts up flashes */
function one(input: number[][], steps = 10) {
  let octopi: Octopi = {
    grid: input,
    flashCount: 0,
  };

  for (let step = 1; step <= steps; step++) {
    for (let y = 0; y < input.length; y++) {
      for (let x = 0; x < input[0].length; x++) {
        simulateOctopusRave(octopi, y, x);
      }
    }
    octopi.grid = octopi.grid.map((l) => l.map((c) => (c > 9 ? 0 : c)));
  }
  console.log(octopi.flashCount);
}

function two(input: number[][]) {
  let octopi: Octopi = {
    grid: input,
    flashCount: 0,
  };

  let i = 1;
  while (true) {
    for (let y = 0; y < input.length; y++) {
      for (let x = 0; x < input[0].length; x++) {
        simulateOctopusRave(octopi, y, x);
      }
    }
    let brightEnough = true;
    octopi.grid = octopi.grid.map((l) =>
      l.map((c) => {
        if (c > 9) return 0;
        else brightEnough = false;
        return c;
      })
    );
    if (brightEnough) return i;
    i++;
  }
}

file.readFile("./inputs/11.txt", "utf8", (_, data) => {
  const input = data.split("\n").map((l) => l.split("").map(Number));
  input.pop();
  // one(input, 100);
  console.log(two(input));
});
