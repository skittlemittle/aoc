const file = require("fs");

function countOnes(input: string, bits: number) {
  const count = Array(bits).fill(0); // counts 1's for each bit
  let position = 0;
  for (let i of input) {
    if (i === "1") count[position]++;
    position++;
    if (i === "\n") position = 0;
  }
  return count;
}

function one(input: string, bits = 12, rows = 1000) {
  const count = countOnes(input, bits);
  const gamma = count.map((v) => (rows - v < rows / 2 ? 1 : 0));
  const epsilon = count.map((v) => (rows - v > rows / 2 ? 1 : 0));
  console.log(count);
  return { gamma, epsilon };
}

function two(input: string[], bits = 12) {
  let oxygen = [...input];
  let carbon = [...input];
  for (let i = 0; i < bits; i++) {
    const o_count = countOnes(oxygen.toString().replace(/,/g, "\n"), bits);
    const o_rows = oxygen.length;
    const gamma = o_count.map((v) => (o_rows - v <= o_rows / 2 ? 1 : 0));
    oxygen = oxygen.filter((word) => parseInt(word[i]) === gamma[i]);
    if (oxygen.length === 1) break;
  }
  for (let i = 0; i < bits; i++) {
    const c_count = countOnes(carbon.toString().replace(/,/g, "\n"), bits);
    const c_rows = carbon.length;
    const epsilon = c_count.map((v) => (c_rows - v > c_rows / 2 ? 1 : 0));
    carbon = carbon.filter((word) => parseInt(word[i]) === epsilon[i]);
    if (carbon.length === 1) break;
  }
  return { oxygen, carbon };
}

file.readFile("./inputs/3.txt", "utf8", (_, data) => {
  const { gamma, epsilon } = one(data);
  console.log(
    parseInt(gamma.toString().replace(/,/g, ""), 2) *
      parseInt(epsilon.toString().replace(/,/g, ""), 2)
  );
  const input = [...data.split("\n")];
  input.splice(-1, 1);
  const { oxygen, carbon } = two(input);
  console.log(
    parseInt(oxygen.toString().replace(/,/g, ""), 2) *
      parseInt(carbon.toString().replace(/,/g, ""), 2)
  );
});
