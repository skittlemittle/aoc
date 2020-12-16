const fs = require("fs");

function one(time, IDs) {
  let closestId = false;
  let timestep = -1;

  while (!closestId) {
    timestep++;
    const comingBuses = IDs.filter(
      (id) => id * Math.floor(timestep / id) >= time
    );
    if (comingBuses.length > 0) closestId = comingBuses[0];
  }
  return (closestId * Math.floor(timestep / closestId) - time) * closestId;
}

fs.readFile("./inputs/13.txt", "utf8", (_, data) => {
  data = data.split("\n");
  const departureTime = data[0];
  const IDs1 = data[1].split(",").filter((id) => id !== "x");

  console.log(one(departureTime, IDs1));
});
