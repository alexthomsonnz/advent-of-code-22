import fs from "fs";
import path from "path";

let input = fs.readFileSync(path.join(__dirname, `./day10.txt`)).toString();

let cycle = 0;
let xVal = 1;
const signals = [];
const pixels = {};

function incrementCycle() {
    cycle++;
    if (cycle === 20 || (cycle - 20) % 40 === 0) {
        signals.push(cycle * xVal);
    }
    drawPixel();
}

function drawPixel() {
    let rowToDraw = Math.floor(((cycle - 1) / 40) % 6);
    if (!pixels[rowToDraw]) pixels[rowToDraw] = "";

    let indexToDraw = pixels[rowToDraw].length;

    const inRange = indexToDraw >= xVal - 1 && indexToDraw <= xVal + 1;

    pixels[rowToDraw] += inRange ? "#" : ".";
}

input.split("\n").forEach((row, index) => {
    const [command, num] = row.trim().split(" ");

    incrementCycle();
    if (command === "noop") {
        return;
    }
    incrementCycle();
    xVal += parseInt(num.trim(), 10);
});

const part1Answ = signals.reduce((acc, x) => acc + x, 0);
console.log("\n\nPart 1 Answer:", part1Answ);
console.log("\n\nPart 2 Answer:");
console.log(pixels);
