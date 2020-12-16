// this is epic guys can we get a like
const fs = require("fs");

function one(input) {
  let count = 0;
  input.forEach((e) => (count += new Set(e).size));
  return count;
}

function two(input) {
  let count = 0;
  input.forEach((e) => {
    const keys = new Set(e);
    keys.delete(" ");
    keys.forEach((key) => {
      let haskey = true;
      e.split(" ").forEach((line) => {
        if (!line.includes(key)) haskey = false;
      });
      if (haskey) count += 1;
    });
  });
  return count;
}

fs.readFile("inputs/6.txt", "utf8", (_, data) => {
  const input = [...data.split(/\n{2,}/g)];
  console.log(one(input.map((g) => g.replace(/\n/g, "").split(""))));
  console.log(two(input.map((g) => g.replace(/\n/g, " "))));
});
