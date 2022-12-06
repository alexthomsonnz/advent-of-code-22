import fs from "fs";
import assert from "assert";
import path from "path";

function part1(input: string) {
    let answer = 0;

    input.split("").forEach((_, index) => {
        if (index < 4) return;
        const last4 = input.substring(0, index).slice(-4);
        assert(last4.length == 4);

        if ([...new Set(last4.split(""))].length == 4 && !answer) {
            answer = index;
        }
    });
    return answer;
}

function part2(input: string) {
    let answer = 0;
    input.split("").forEach((_, index) => {
        if (index < 14) return;
        const last4 = input.substring(0, index).slice(-14);

        if ([...new Set(last4.split(""))].length == 14 && !answer) {
            answer = index;
        }
    });
    return answer;
}

function main() {
    let content = fs
        .readFileSync(path.join(__dirname, `./day6.txt`))
        .toString();

    // let content = "mjqjpqmgbljsphdztnvjfqwrcgsmlb";

    const part1Answer = part1(content.toString());
    console.log("\n\nPart 1 Answer:", part1Answer);

    const part2Answer = part2(content.toString());
    console.log("\n\nPart 2 Answer:", part2Answer);
}
main();
