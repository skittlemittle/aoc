const fs = require("fs");
// range[max, min] inclusive
function getHalf(range, half) {
  if (half === "R" || half === "B")
    return [range[0], (range[0] - range[1] + 1) / 2 + range[1]];
  if (half === "L" || half === "F")
    return [(range[0] - range[1] - 1) / 2 + range[1], range[1]];
}

function parseBoardingPass(pass, rows, columns) {
  let Racc = rows;
  let Cacc = columns;
  for (ch of pass) {
    if (ch === "F" || ch === "B") Racc = getHalf(Racc, ch);
    if (ch === "R" || ch === "L") Cacc = getHalf(Cacc, ch);
  }
  // do all divisions in 1 based index then return in 0 based
  return { row: Racc[0] - 1, column: Cacc[0] - 1 };
}

function one(input, rows, columns) {
  let highestID = 0;
  input.forEach((pass) => {
    if (pass) {
      const { row, column } = parseBoardingPass(pass, rows, columns);
      const id = row * 8 + column;
      if (id > highestID) highestID = id;
    }
  });
  return highestID;
}

fs.readFile("./inputs/5.txt", "utf8", (_, data) => {
  const input = [...data.split(/\n/g)];
  const rows = [128, 1];
  const columns = [8, 1];
  console.log(one(input, rows, columns));
});
