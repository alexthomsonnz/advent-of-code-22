import fs from "fs";
import path from "path";

const stacksInput = {
    1: "SZPDLBFC",
    2: "NVGPHWB",
    3: "FWBJG",
    4: "GJNFLWCS",
    5: "WJLTPMSH",
    6: "BCWGFS",
    7: "HTPMQBW",
    8: "FSWT",
    9: "NCR",
};
function part1(input: string) {
    const rows = input.split("\n");
    const stacks = { ...stacksInput };

    rows.forEach((row, index) => {
        const [amount, from, to] = row
            .match(/[0-9]+/g)
            .map((n) => parseInt(n, 10));

        const fromStackArr: string[] = stacks[from].split("");

        let moving = "";
        for (let i = 0; i < amount; i++) {
            moving += fromStackArr.pop();
        }

        stacks[from] = fromStackArr.join("");
        stacks[to] += moving;
    });

    const answer = Object.values(stacks)
        .map((stack) => {
            return stack.charAt(stack.length - 1);
        })
        .join("");

    return answer;
}

function part2(input: string) {
    const rows = input.split("\n");
    const stacks = { ...stacksInput };

    rows.forEach((row, index) => {
        const [amount, from, to] = row
            .match(/[0-9]+/g)
            .map((n) => parseInt(n, 10));

        const fromStackArr: string[] = stacks[from].split("");

        let moving = "";
        for (let i = 0; i < amount; i++) {
            moving += fromStackArr.pop();
        }

        // Only part 2 difference lol
        moving = moving.split("").reverse().join("");

        stacks[from] = fromStackArr.join("");
        stacks[to] += moving;
    });

    const answer = Object.values(stacks)
        .map((stack) => {
            return stack.charAt(stack.length - 1);
        })
        .join("");

    return answer;
}

function main() {
    let content = fs
        .readFileSync(path.join(__dirname, `./day5.txt`))
        .toString();

    const part1Answer = part1(content.toString());
    console.log("\n\nPart 1 Answer:", part1Answer);

    const part2Answer = part2(content.toString());
    console.log("\n\nPart 2 Answer:", part2Answer);
}
main();
