const file = require("fs");

function simulate_fish(input: number[], rounds = 10) {
  const fish = [...input];
  for (let round = 0; round < rounds; round++) {
    for (let i = 0; i < fish.length; i++) {
      if (fish[i] !== 0) {
        fish[i]--;
      } else {
        fish[i] = 6;
        fish.push(9);
      }
    }
  }
  return fish.length;
}

file.readFile("./inputs/6.txt", "utf8", (_, data) => {
  const input = data.split(",").map((n) => parseInt(n));

  console.log(simulate_fish(input, 80));
  // in my dreams
  //console.log(simulate_fish(input, 256));
});
