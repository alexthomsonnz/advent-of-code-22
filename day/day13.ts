import fs from "fs";
import assert from "assert";
import path from "path";

let content = fs.readFileSync(path.join(__dirname, `./day13.txt`)).toString();

function checkIsSmaller(one: any, two: any): boolean | undefined {
    if (Array.isArray(one) && Array.isArray(two)) {
        const bothLengths = Math.min(one.length, two.length);
        for (let i = 0; i < bothLengths; i++) {
            const c = checkIsSmaller(one[i], two[i]);
            if (c !== undefined) {
                return c;
            }
        }
        if (one.length > two.length) return false;
        if (one.length < two.length) return true;
        return undefined;
    } else if (typeof one === "number" && typeof two === "number") {
        if (one > two) return false;
        if (one < two) return true;
        return undefined;
    }

    // One's an array and the other's not
    // Turn it into an array and re run
    return checkIsSmaller(
        Array.isArray(one) ? one : [one],
        Array.isArray(two) ? two : [two]
    );
}

// Part 1
let answer = 0;
let index = 1;
content.split("\n\n").forEach((row) => {
    const [one, two] = row.split("\n").map((str) => eval(str));
    if (checkIsSmaller(one, two)) {
        answer += index;
    }
    index++;
});

console.log("\n\nPart 1 Answer:", answer);

// Part 2
let packets = content
    .split("\n")
    .filter((line) => line.trim() !== "")
    .map((line) => eval(line));

packets = [...packets, [[2]], [[6]]];

packets.sort((a, b) => (checkIsSmaller(a, b) === true ? -1 : 1));

const index1 =
    packets.findIndex((packet) => JSON.stringify(packet) === "[[2]]") + 1;
const index2 =
    packets.findIndex((packet) => JSON.stringify(packet) === "[[6]]") + 1;

console.log("\n\nPart 2 Answer:", index1 * index2);
