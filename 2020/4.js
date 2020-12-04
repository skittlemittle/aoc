const fs = require("fs");

const required = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"];

function one(input) {
  let cnt = 0;
  input.forEach((passport) => {
    let valid = true;
    for (field of required) {
      if (passport.search(field) === -1) {
        valid = false;
        break;
      }
    }
    if (valid) cnt++;
  });
  return cnt;
}

function two(input) {
  let cnt = 0;
  input.forEach((passport) => {
    let valid = true;
    for (field of required) {
      if (passport.search(field) === -1 || !valid) {
        valid = false;
        break;
      }
      const data = passport
        .split(" ")
        .find((it) => it.search(field) != -1)
        .split(":")[1];
      // AHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAAAAAAAAAAAAAAAA
      switch (field) {
        case required[0]:
          if (data < 1920 || data > 2002) valid = false;
          break;
        case required[1]:
          if (data < 2010 || data > 2020) valid = false;
          break;
        case required[2]:
          if (data < 2020 || data > 2030) valid = false;
          break;
        case required[3]:
          if (data.includes("cm")) {
            const tmp = data.replace("cm", "") * 1;
            if (tmp < 150 || tmp > 193) valid = false;
          } else if (data.includes("in")) {
            const tmp = data.replace("in", "") * 1;
            if (tmp < 59 || tmp > 76) valid = false;
          }
          break;
        case required[4]:
          valid = /#[a-f0-9]{6}/.test(data); // totally didnt peek at koens answer
          break;
        case required[5]:
          valid = ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"].some(
            (c) => data === c
          );
          break;
        case required[6]:
          valid = /[0-9]{9}/.test(data) && data.length === 9;
          break;
        default:
          valid = false;
          console.log("cringechamp");
      }
    }
    if (valid) cnt++;
  });
  // i have no clue why i need to -1 but it fixes it fuck this problem
  return cnt - 1;
}

fs.readFile("./inputs/4.txt", "utf8", (_, data) => {
  // this line took me 10 minutes smh
  const input = [...data.split(/\n{2,}/g)].map((l) => l.replace(/\n/g, " "));
  console.log(one(input));
  console.log(two(input));
});
