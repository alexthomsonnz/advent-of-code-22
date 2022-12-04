import * as fs from "fs";

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

async function main() {
    let content = fs.readFileSync(`./template.txt`).toString();

    const part1Answer = part1(content.toString());
    console.log("\n\nPart 1 Answer\n");
    console.log(part1Answer);
    const part2Answer = part2(content.toString());
    console.log("\n\nPart 2 Answer\n");
    console.log(part2Answer);
}
main();
