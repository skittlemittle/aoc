const fs = require("fs");

// x: E+/W-, y: N+/S-
const initPosition = { x: 0, y: 0, facing: "E" }; 
const directions = ["N", "E", "S", "W"];
const actions = {
  "F": forward,
  "L": left,
  "R": right,
  "N": (pos, amount) => pos.y += amount,
  "S": (pos, amount) => pos.y -= amount,
  "E": (pos, amount) => pos.x += amount,
  "W": (pos, amount) => pos.y -= amount,
};

function forward(pos, amount) {
  switch(pos.facing) {
    case "E":
      pos.x += amount;
      break;
    case "W":
      pos.x -= amount;
      break;
    case "N":
      pos.y += amount;
      break;
    case "S":
      pos.y -= amount;
      break;
    default:
      console.error(`what the fuck is ${pos.facing}`)
  }
}

// dry more like wet
function left(pos, amount) {
  const cdir = directions.indexOf(pos.facing);
  pos.facing = directions[(cdir - (amount / 90) + 4) % 4];
}
// dry more like wet
function right(pos, amount) {
  const cdir = directions.indexOf(pos.facing);
  pos.facing = directions[(cdir + (amount / 90) + 4) % 4];
}

function one(input) {
  const pos = { ...initPosition };
  for (const instruction of input) {
    const action = instruction.split(/\d+/)[0];
    const amount = instruction.split(/[A-Z]/)[1] * 1;
    actions[action](pos, amount);
  }
  return Math.abs(pos.x) + Math.abs(pos.y);
}

fs.readFile("./inputs/12.txt", "utf8", (_, data) => {
  const input = [...data.split("\n")];
  input.splice(-1, 1);
  console.log(one(input));
  left(initPosition, 90);
});
