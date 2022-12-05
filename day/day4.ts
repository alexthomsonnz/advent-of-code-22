import * as fs from "fs";
import path from "path";

function part1(input: string) {
    const rows = input.split("\n");
    let answer = 0;

    rows.forEach((row, index) => {
        const [elf1, elf2] = row.split(",");
        const [elf1L, elf1H] = elf1.split("-").map((n) => Number(n));
        const [elf2L, elf2H] = elf2.split("-").map((n) => Number(n));

        if (elf1L >= elf2L && elf1H <= elf2H) {
            answer++;
        } else if (elf2L >= elf1L && elf2H <= elf1H) {
            answer++;
        }
    });

    return answer.toString();
}

function part2(input: string) {
    const rows = input.split("\n");
    let answer = 0;

    rows.forEach((row, index) => {
        "10-58,58-75";
        const [elf1, elf2] = row.split(",");
        const [elf1L, elf1H] = elf1.split("-").map((n) => Number(n));
        const [elf2L, elf2H] = elf2.split("-").map((n) => Number(n));

        if (
            (elf1L >= elf2L && elf1L <= elf2H) ||
            (elf1H <= elf2H && elf1H >= elf2H)
        ) {
            answer++;
        } else if (
            (elf2L >= elf1L && elf2L <= elf1H) ||
            (elf2H <= elf1H && elf2H >= elf1H)
        ) {
            answer++;
        }
    });
    return answer;
}

function main() {
    let content = fs
        .readFileSync(path.join(__dirname, "./day4.txt"))
        .toString();

    const part1Answer = part1(content.toString());
    console.log("\n\nPart 1 Answer\n");
    console.log(part1Answer);
    const part2Answer = part2(content.toString());
    console.log("\n\nPart 2 Answer\n");
    console.log(part2Answer);
}
main();
