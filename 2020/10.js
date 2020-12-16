// d10,2

const fs = require("fs");
const visited = {};
let adapters, longest;

// all roads lead to rome
function countPaths(node) {
  if (node === longest - 1) return 1;
  if (node in visited) return visited[node];

  let combinations = 0;
  for (let i = 1; i <= 3; i++) {
    if (node < longest - i && adapters[node + i] - 3 <= adapters[node])
      combinations += countPaths(node + i);
  }

  visited[node] = combinations;
  return combinations;
}

fs.readFile("./inputs/10.txt", "utf8", (_, data) => {
  adapters = data
    .split("\n")
    .map(Number)
    .sort((a, b) => a - b);
  adapters.splice(0, 1);
  adapters.push(adapters[adapters.length - 1] + 3);

  longest = adapters.length;

  console.log(countPaths(0));
});
