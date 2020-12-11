const fs = require("fs");
const PREAMBLE = 25;

function isSumOf(n, set) {
  // shhhhhhhhhhhhhhh dont tell anyone
  let r = false;
  for (const i of set) {
    if (r) break;
    for (const j of set) {
      if (((i + j) === n) && (i !== j))
        r = true;
    }
  }
    return r;
}

function one(input) {
  let r = false;
  for (const i in input) {
    if (r) break;
    const n = input[i];
    if (i >= PREAMBLE) {
      if(!isSumOf(n, input.slice(i - (PREAMBLE), i)))
        r = n;
    }
  }
  return r;
}

function two(input, target) {
  // brute force epicly
  let r = false;
  let size = 2;
  while(!r) {
    for (let i in input) {
      i *= 1;
      const set = input.slice(i, i + size);
      if (set.reduce((acc, n) => acc + n) === target) {
        r = Math.max(...set) + Math.min(...set);
      }
    }
    size++;
  }
  return r;
}

fs.readFile("./inputs/9.txt", "utf8", (_, data) => {
  const input = data.split(/\n/g).map(Number);
  const target = one(input);
  console.log(target);
  console.log(two(input, target));
});
