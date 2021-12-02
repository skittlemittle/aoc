const fs = require("fs");

class Maffs {
  constructor(maffs) {
    this.maffs = maffs.match(/\d+|\*|\+|\(|\)/g);
    this.index = 0;
  }

  nextToken(token) {
    if (this.index < this.maffs.length && this.maffs[this.index] === token) {
      this.index++;
      return true;
    } else {
      return false;
    }
  }

  evaluateMaffs() {
    if (this.nextToken("(")) {
      const nestedMaffs = this.solve();
      this.nextToken(")");
      return nestedMaffs;
    } else {
      this.index++;
      return Number(this.maffs[this.index - 1]);
    }
  }

  solve() {
    let result = this.evaluateMaffs();

    while (true) {
      if (this.nextToken("+")) {
        result += this.evaluateMaffs();
      } else if (this.nextToken("*")) {
        result *= this.evaluateMaffs();
      } else {
        break;
      }
    }
    return Number(result);
  }
}

function one(input) {
  let sum = 0;
  input.forEach((maffsProblem) => (sum += new Maffs(maffsProblem).solve()));
  return sum;
}

fs.readFile("./inputs/18.txt", "utf8", (_, data) => {
  const input = data.split("\n");
  input.splice(-1, 1);
  console.log(one(input));
});
