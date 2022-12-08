import fs from "fs";
import assert from "assert";
import path from "path";

type TreeMatrix = number[][];
function isVisibleInLine(line: Array<number>, index: number): boolean {
    const height = line[index];

    const beforeArray = line.slice(0, index);
    const tallestBefore = Math.max(...beforeArray);

    const afterArray = [...line].reverse().slice(0, line.length - 1 - index);
    const tallestAfter = Math.max(...afterArray);

    return tallestBefore < height || tallestAfter < height;
}

function scoreForLine(line: Array<number>, index: number): number {
    const height = line[index];

    // Get array of heights before the tree, not including the index.
    const beforeArray = line.slice(0, index).reverse();
    // Get array of heights after the tree, not including the index.
    const afterArray = [...line]
        .reverse()
        .slice(0, line.length - 1 - index)
        .reverse();

    let beforeScore = 0;
    // Loop from closest tree
    while (beforeArray.length > 0) {
        if (beforeArray[0] >= height) {
            beforeScore += 1;
            break;
        }
        beforeScore += 1;
        beforeArray.shift();
    }
    let afterScore = 0;
    while (afterArray.length > 0) {
        if (afterArray[0] >= height) {
            afterScore += 1;
            break;
        }
        afterScore += 1;
        afterArray.shift();
    }
    return afterScore * beforeScore;
}

function makeTreesMatrix(rows): TreeMatrix {
    const trees: TreeMatrix = [];
    rows.forEach((row, index) => {
        trees[index] = [];
        row.split("").forEach((height) => {
            trees[index].push(parseInt(height, 10));
        });
    });
    console.log("Trees Matrix");
    console.log(trees);
    return;
}

function part1(input: string) {
    const rows = input.split("\n");
    let answer = 0;

    const trees: TreeMatrix = makeTreesMatrix(rows);

    for (let row = 0; row < trees.length; row++) {
        // get column as row;
        const rowLine = trees[row];
        for (let col = 0; col < trees.length; col++) {
            const columnLine: number[] = trees.map(
                (_, index) => trees[index][col]
            );

            if (
                isVisibleInLine(columnLine, row) ||
                isVisibleInLine(rowLine, col)
            ) {
                answer += 1;
            }
        }
    }
    return answer;
}

function part2(input: string) {
    const rows = input.split("\n");

    const trees: TreeMatrix = makeTreesMatrix(rows);

    const scores: number[] = [];
    for (let row = 0; row < trees.length; row++) {
        const rowLine = trees[row];
        for (let col = 0; col < trees.length; col++) {
            const columnLine: number[] = trees.map(
                (_, index) => trees[index][col]
            );

            let score = 0;

            // Get scenic score for tree
            score = scoreForLine(columnLine, row) * scoreForLine(rowLine, col);

            scores.push(score);
        }
    }
    console.log(scores);
    return Math.max(...scores);
}

let content = fs.readFileSync(path.join(__dirname, `./day8.txt`)).toString();
// let content = `30373
// 25512
// 65332
// 33549
// 35390`;

const part1Answer = part1(content.toString());
console.log("\n\nPart 1 Answer:", part1Answer);

const part2Answer = part2(content.toString());
console.log("\n\nPart 2 Answer:", part2Answer);
