const file = require("fs");
const isNumber = (char) => !isNaN(parseInt(char));
function distToSymbol(p, line) {
    for (let i = p + 1; i < line.length; i++) {
        if (!isNumber(line[i]))
            return Math.abs(i - p);
    }
    return false;
}
function seekNumber(direction, point, line) {
    const step = direction === "R" ? 1 : -1;
    const p = point + step;
    for (let i = p; i < line.length && i >= 0; i += step) {
        if (isNumber(line[i])) {
            return [i, parseInt(line[i])];
        }
    }
    return false;
}
function split(number) {
    return [Math.floor(number / 2), Math.ceil(number / 2)];
}
function explode(point, line) {
    const seekL = seekNumber("L", point + 1, line);
    const seekR = seekNumber("R", point + 3, line);
    const l = parseInt(line[point + 1]);
    const r = parseInt(line[point + 3]);
    const left = seekL ? l + seekL[1] : undefined;
    const right = seekR ? r + seekR[1] : undefined;
    // right then center then left
    line = `${line.substring(0, seekR[0])}${right ? right : ""}${seekR[0] < line.length ? line.substring(seekR[0] + 1) : ""}`;
    line = `${line.substring(0, point)}0${line.substring(point + 5)}`;
    line = `${seekL[0] >= 0 ? line.substring(0, seekL[0]) : ""}${left ? left : ""}${line.substring(seekL[0] + 1)}`;
    return line;
}
function reduce(line) {
    while (true) {
        let gamed = false;
        let depth = 0;
        //@ts-ignore
        for (const index in line) {
            const i = parseInt(index);
            const ch = line[i];
            if (ch === "[")
                depth++;
            if (ch === "]")
                depth--;
            if (depth === 5) {
                line = explode(i, line);
                gamed = true;
                break;
            }
            const number = parseInt(line.slice(i, i + (distToSymbol(i, line) || 0)));
            if (number > 9) {
                line = `${line.substring(0, i)}[${split(number)}]${line.substring(i + number.toString().length)}`;
                gamed = true;
                break;
            }
        }
        if (!gamed)
            break;
    }
    return line;
}
function add(line1, line2) {
    return `[${line1},${line2}]`;
}
function one(input) {
    let acc = input[0];
    for (let i = 1; i < input.length; i++) {
        acc = reduce(add(acc, input[i]));
        console.log("==", acc, "\n");
    }
}
file.readFile("./inputs/18.test.txt", "utf8", (_, data) => {
    const input = data.split("\n");
    input.pop();
    one(input);
});
/*
tests

explode(12, "[7,[6,[5,[4,[3,2]]]]]");
explode(4, "[[[[[9,8],1],2],3],4]");
explode(10, "[[6,[5,[4,[3,2]]]],1]");
explode(10, "[[3,[2,[1,[7,3]]]],[6,[5,[4,[3,2]]]]]");
explode(24, "[[3,[2,[8,0]]],[9,[5,[4,[3,2]]]]]");

console.log(seekNumber("R", 2, "[[3,[2,[8,0]]],[9,[5,[4,[3,2]]]]]"));
console.log(seekNumber("L", 8, "[[3,[2,[8,0]]],[9,[5,[4,[3,2]]]]]"));

console.log(reduce("[[3,[2,[1,[7,3]]]],[6,[5,[4,[3,2]]]]]"));
console.log(reduce("[[[[[4,3],4],4],[7,[[8,4],9]]],[1,1]]"));
*/
