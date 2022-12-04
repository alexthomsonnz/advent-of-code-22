import fs from "fs";
import assert from "assert";
import path from "path";

function part1(input: string) {
    const rows = input.split("\n");
    let answer = 0;

    rows.forEach((row, index) => {
        // Code
    });
    return answer;
}

function part2(input: string) {
    const rows = input.split("\n");
    let answer = 0;

    rows.forEach((row, index) => {
        // Code
    });
    return answer;
}

function main() {
    let content = fs
        .readFileSync(path.join(__dirname, `./template.txt`))
        .toString();

    const part1Answer = part1(content.toString());
    console.log("\n\nPart 1 Answer:", part1Answer);

    const part2Answer = part2(content.toString());
    console.log("\n\nPart 2 Answer:", part2Answer);
}
main();
