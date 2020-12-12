const fs = require("fs");

// x: E+/W-, y: N+/S-
const initPosition = { x: 0, y: 0, wx: 10, wy: 1, facing: "E" };
const directions = ["N", "E", "S", "W"];
const actions = {
  "F": forwardTwo, // forwardOne,
  "L": (pos, amount) => rotateTwo(pos, amount, "L"),// rotateOne(pos, amount, "L"),
  "R": (pos, amount) => rotateTwo(pos, amount, "R"),// rotateOne(pos, amount, "R"),
  "N": (pos, amount) => pos.wy += amount, // pos.y += amount,
  "S": (pos, amount) => pos.wy -= amount, // pos.y -= amount,
  "E": (pos, amount) => pos.wx += amount, // pos.x += amount,
  "W": (pos, amount) => pos.wx -= amount, // pos.y -= amount,
};

function forwardOne(pos, amount) {
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

function forwardTwo(pos, amount) {
  pos.x += amount * pos.wx;
  pos.y += amount * pos.wy;
}

function rotateOne(pos, amount, dir) {
  const cdir = directions.indexOf(pos.facing);
  pos.facing = directions[(cdir + (dir == "L"? -(amount / 90) : amount / 90) + 4) % 4];
}

function rotateTwo(pos, amount, dir) {
  for (let _ = 0; _ < (amount / 90); _++) {
    const wx = pos.wx;
    const wy = pos.wy;
    pos.wx = (dir == "L" ? -wy : wy);
    pos.wy = (dir == "L" ? wx : -wx);
  }
}

function solve(input) {
  // oh noOoOOoO weird pass by reference mutation!
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
  console.log(solve(input));
});
