// babaooey -cloud
const fs = require("fs");

// pos = [z, y, x]
function countActiveNeighbors(pos, space) {
  let sum = 0;
  const depth = space.length;
  const height = space[0].length;
  const width = space[0][0].length;
  // O(ur mum)
  for (let zo = -1; zo < 2; zo++) {
    for (let yo = -1; yo < 2; yo++) {
      for (let xo = -1; xo < 2; xo++) {
        // TODO: nae nae
        const z = pos[0] + zo;
        const y = pos[1] + yo;
        const x = pos[2] + xo;
        if (
          !(z < 0 || z >= depth || y < 0 || y >= height || x < 0 || x >= width)
        )
          sum += space[z][y][x];
      }
    }
  }
  sum -= space[pos[0]][pos[1]][pos[2]];
  return sum;
}

// if it aint in current space its off
function cubeAt(z, y, x, space) {
  if (z in space && y in space[0] && x in space[0][0]) return space[z][y][x];
  else return 0;
}

function one(input) {
  // padding of one on each edge, indexing: z, y, x
  let space = [...Array(input.length + 2)].map((_, z) =>
    [...Array(input[0].length + 2)].map((_, y) =>
      new Array(input[0][0].length + 2)
        .fill(0)
        .map((_, x) => cubeAt(z - 1, y - 1, x - 1, input))
    )
  );
  console.log(space);

  for (let cycle = 0; cycle < 6; cycle++) {
    console.log("===================================");
    const size = {
      z: space.length,
      y: space[0].length,
      x: space[0][0].length,
    };
    const next = [...Array(size.z)].map(() =>
      [...Array(size.y)].map(() => new Array(size.x).fill(0))
    );

    for (let z = 0; z < size.z; z++) {
      for (let y = 0; y < size.y; y++) {
        for (let x = 0; x < size.x; x++) {
          const numActive = countActiveNeighbors([z, y, x], space);
          const currCube = cubeAt(z, y, x, space);

          if (currCube && [2, 3].find((n) => n === numActive)) {
            next[z][y][x] = 1;
          } else if (!currCube && numActive === 3) {
            next[z][y][x] = 1;
          } else {
            next[z][y][x] = 0;
          }
        }
      }
    }

    for (const d in next) {
      console.log("+++++");
      for (const f in next[d]) {
        console.log(`${next[d][f]}`);
      }
    }
    // owo imagine copying like this
    space = [...Array(size.z + 2)].map((_, z) =>
      [...Array(size.y + 2)].map((_, y) =>
        new Array(size.x + 2)
          .fill(0)
          .map((_, x) => cubeAt(z - 1, y - 1, x - 1, next))
      )
    );
  }
  let activeCount = 0;
  for (const z in space) {
    for (const y in space[z]) {
      activeCount += space[z][y].filter((c) => c === 1).length;
    }
  }
  return activeCount;
}

fs.readFile("./inputs/17.txt", "utf8", (_, data) => {
  const input = [...data.split("\n")];
  input.splice(-1, 1);
  // input slice starts at 0,0,0 at the top right corner(^ <-)
  console.log(
    one([input.map((line) => [...line].map((it) => (it === "." ? 0 : 1)))])
  );
});
