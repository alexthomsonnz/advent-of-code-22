import assert from "assert";
import fs from "fs";
import path from "path";

function scoreForLetter(letter: string): number {
    if (letter === letter.toLowerCase()) {
        // IS LOWERCASE
        return Number(letter.charCodeAt(0)) - 96;
    } else {
        // IS UPPERCASE
        return Number(letter.charCodeAt(0)) - 38;
    }
}

function part1(input: string) {
    let answer = 0;
    const rows = input.split("\n");

    rows.forEach((row, index) => {
        const half1 = row.slice(0, row.length / 2);
        const half2 = row.slice(row.length / 2, row.length);

        let letterInCommon = undefined;

        // FIND LETTER IN COMMONs
        for (var i = 0; i < half1.length; i++) {
            for (var j = 0; j < half2.length; j++) {
                if (half1[i] === half2[j]) {
                    letterInCommon = half1[i];
                    break;
                }
            }
            if (letterInCommon) {
                break;
            }
        }

        assert(
            letterInCommon,
            `Couldn't find letter ${letterInCommon}, ${half1}, ${half2}`
        );

        answer += scoreForLetter(letterInCommon);
    });

    return answer.toString();
}

function part2(input: string) {
    const rows = input.split("\n");
    let answer = 0;

    [...rows, 1, 1, 1].forEach((row, index) => {
        if (index % 3 !== 0 || index === 0) {
            return;
        }
        const half1 = rows[index - 3];
        const half2 = rows[index - 2];
        const half3 = rows[index - 1];

        let letterInCommon = undefined;

        for (var i = 0; i < half1.length; i++) {
            for (var j = 0; j < half2.length; j++) {
                for (var k = 0; k < half3.length; k++) {
                    if (
                        half1[i] === half2[j] &&
                        half2[j] === half3[k] &&
                        half1[i] === half3[k]
                    ) {
                        letterInCommon = half1[i];
                        break;
                    }
                }
            }
        }

        assert(!!letterInCommon, "No Letter in Common");

        answer += scoreForLetter(letterInCommon);
    });

    return answer.toString();
}

async function main() {
    let content = fs
        .readFileSync(path.join(__dirname, `./day3.txt`))
        .toString();

    const part1Answer = part1(content.toString());
    console.log("\n\nPart 1 Answer\n");
    console.log(part1Answer);
    const part2Answer = part2(content.toString());
    console.log("\n\nPart 2 Answer\n");
    console.log(part2Answer);
}
main();
