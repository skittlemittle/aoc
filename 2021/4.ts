const file = require("fs");

/**
 * This is the most braindead way to do this, i make two boards, one of the rows one of
 * the columns, then i just remove numbers from em when i get hits and see if a row
 * or column becomes empty.
 * Please forgive me for this sin.
 */
class Board {
  private rows: number[][];
  private cols: number[][];
  private boardSize: number;
  private stopped: boolean;

  constructor(board: string[], boardSize = 5) {
    this.stopped = false;
    const b = board.map((l) =>
      l
        .split(" ")
        .filter((m) => m.trim())
        .map((ch) => parseInt(ch))
    );
    this.rows = [...b];

    this.cols = [...Array(b.length)].map((c) => Array(b.length).fill(0));
    let j = 0;
    for (const r of b) {
      let i = 0;
      for (const number of r) {
        this.cols[i][j] = number;
        i++;
      }
      j++;
    }
    this.boardSize = boardSize;
  }

  // cross out the number and report any W's
  crossOut(n: number) {
    if (this.stopped) return false;
    this.rows = this.rows.map((r) => r.filter((number) => n !== number));
    this.cols = this.cols.map((c) => c.filter((number) => n !== number));

    for (let i = 0; i < this.boardSize; i++) {
      if (this.rows[i].length === 0 || this.cols[i].length === 0) return true;
    }
    return false;
  }

  score(n: number) {
    let c = 0;
    this.rows.forEach((r) => {
      if (r.length) c += r.reduce((i, j) => i + j);
    });
    return c * n;
  }
  stop() {
    this.stopped = true;
  }
}

file.readFile("./inputs/4.txt", "utf8", (_, data) => {
  const d = data.split(/[\n\r]+/g).filter((l) => l.trim());
  const sequence = d[0].split(",").map((n) => parseInt(n));
  d.shift();

  const boards: Board[] = [];
  let l = 0;
  let b: string[] = [];
  for (const line of d) {
    b.push(line);
    if (l === 4) {
      boards.push(new Board([...b]));
      b = [];
      l = -1;
    }
    l++;
  }

  // ONE
  let winner = false;
  for (const number of sequence) {
    if (winner) break;
    for (const board of boards) {
      if (board.crossOut(number)) {
        console.log(board.score(number));
        winner = true;
      }
    }
  }

  // TWO
  let l_n = 0;
  let last = "";
  for (const number of sequence) {
    for (const b_name in boards) {
      if (boards[b_name].crossOut(number)) {
        boards[b_name].stop();
        last = b_name;
        l_n = number;
      }
    }
  }
  console.log(boards[last].score(l_n));
});
