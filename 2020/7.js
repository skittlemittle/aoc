const fs = require("fs");

let input;
const validBags = new Set();

// a system of bags interlinked within bags interlinked within bags
function one(search) {
  const bagMatch = new RegExp(`(\\d) ${search}`);

  input.forEach(bag => {
    if(bag.match(bagMatch)) {
      const container = bag.split(" ").splice(0, 2).join(" ");
      validBags.add(container);
      one(container);
    }
  });
}

fs.readFile("./inputs/7.txt", "utf8",  (_, data) => {
  input = [...data.split("\n")];
  input.splice(-1, 1);
  one("shiny gold");
  console.log(validBags.size);
});
