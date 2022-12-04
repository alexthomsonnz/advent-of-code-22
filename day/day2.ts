import fs from "fs";
import path from "path";

function part1(input: string) {
    const array = input.split("\n");
    const answers: { [s: string]: number } = {
        AX: 3,
        AY: 6,
        AZ: 0,
        BX: 0,
        BY: 3,
        BZ: 6,
        CX: 6,
        CY: 0,
        CZ: 3,
    };
    let score = 0;
    array.forEach((row) => {
        const [a, b] = row.split(" ");
        if (b == "X") {
            score += 1;
        } else if (b == "Y") {
            score += 2;
        } else if (b == "Z") {
            score += 3;
        }
        score += answers[`${a}${b}` as any];
    });
    return score.toString();
}

function part2(input: string) {
    const array = input.split("\n");

    // X = rock, loose
    // Y = paper, draw
    // Z = sciscors, win
    const whatIShouldPick: { [s: string]: string } = {
        AX: "Z",
        AY: "X",
        AZ: "Y",
        BX: "X",
        BY: "Y",
        BZ: "Z",
        CX: "Y",
        CY: "Z",
        CZ: "X",
    };
    const answers: { [s: string]: number } = {
        AX: 3,
        AY: 6,
        AZ: 0,
        BX: 0,
        BY: 3,
        BZ: 6,
        CX: 6,
        CY: 0,
        CZ: 3,
    };

    function whatIChose(choice: string) {
        if (choice == "X") {
            return 1;
        } else if (choice == "Y") {
            return 2;
        }
        return 3;
    }
    let score = 0;
    array.forEach((row) => {
        const [a, b] = row.split(" ");
        let choice = whatIShouldPick[`${a}${b}`];
        score += whatIChose(choice!);
        score += answers[`${a}${choice}`];
    });

    return score.toString();
}

function main() {
    let content = fs
        .readFileSync(path.join(__dirname, `./day2.txt`))
        .toString();

    const part1Answer = part1(content.toString());
    console.log("\n\nPart 1 Answer\n");
    console.log(part1Answer);
    const part2Answer = part2(content.toString());
    console.log("\n\nPart 2 Answer\n");
    console.log(part2Answer);
}
main();
