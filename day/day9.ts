import fs from "fs";
import assert from "assert";
import path from "path";

type Vector = [number, number];
function addVel(pos: Vector, vel: Vector): Vector {
    return [pos[0] + vel[0], pos[1] + vel[1]];
}
function getVelocity(head: Vector, tail: Vector): Vector {
    return [head[0] - tail[0], head[1] - tail[1]];
}
function isAdjacent(head: Vector, tail: Vector): boolean {
    var dx = Math.abs(head[0] - tail[0]),
        dy = Math.abs(head[1] - tail[1]);

    return dx <= 1 && dy <= 1;
}
function clamp(num: number, min: number, max: number) {
    return num <= min ? min : num >= max ? max : num;
}

function dragTail(tail: Vector, head: Vector): Vector {
    if (head !== tail && !isAdjacent(head, tail)) {
        // Move tail towards head
        // Get the diff
        const direction: Vector = getVelocity(head, tail).map((num) =>
            clamp(num, -1, 1)
        ) as Vector;

        tail = addVel(tail, direction);
    }
    return tail;
}

function part1(input: string) {
    const rows = input.split("\n");
    let answer = 0;

    const tailTrace: {
        [key: string]: number;
    } = {};
    let headPos: Vector = [0, 0];
    let tailPos: Vector = [0, 0];
    rows.forEach((row, index) => {
        const direction = row.split(" ")[0];
        const steps = parseInt(row.split(" ")[1]);

        let velocity: [number, number];
        switch (direction) {
            case "U":
                velocity = [0, 1];
                break;
            case "D":
                velocity = [0, -1];
                break;
            case "L":
                velocity = [-1, 0];
                break;
            case "R":
                velocity = [1, 0];
                break;
            default:
                throw new Error();
        }

        for (let i = 0; i < steps; i++) {
            // Move head
            headPos = addVel(headPos, velocity);

            // Move tail
            tailPos = dragTail([...tailPos], headPos);

            // increment position dict
            const posKey = tailPos.map((k) => k.toString()).join(",");
            if (!tailTrace[posKey]) tailTrace[posKey] = 0;
            tailTrace[posKey]++;
        }
    });
    answer = Object.keys(tailTrace).length;
    return answer;
}

function part2(input: string) {
    const rows = input.split("\n");
    let answer = 0;

    const tailTrace: {
        [key: string]: number;
    } = {};
    let headPos: Vector = [0, 0];
    // Tails array. 0 -> closest to head
    const tails = new Array<Vector>(9).fill([0, 0]);
    rows.forEach((row) => {
        const direction = row.split(" ")[0];
        const steps = parseInt(row.split(" ")[1]);
        console.log(direction, steps);

        let velocity: [number, number];
        switch (direction) {
            case "U":
                velocity = [0, 1];
                break;
            case "D":
                velocity = [0, -1];
                break;
            case "L":
                velocity = [-1, 0];
                break;
            case "R":
                velocity = [1, 0];
                break;
            default:
                throw new Error();
        }

        for (let i = 0; i < steps; i++) {
            // Move head
            headPos = addVel(headPos, velocity);

            // Move all those tails
            for (let tailIndex = 0; tailIndex < tails.length; tailIndex++) {
                const tail = tails[tailIndex];
                let knotAhead = tails[tailIndex - 1];
                if (!knotAhead) knotAhead = headPos;

                tails[tailIndex] = dragTail([...tail], knotAhead);

                steps == 5 &&
                    direction == "R" &&
                    console.log(tailIndex, knotAhead);
            }
            steps == 5 && direction == "R" && console.log(headPos, tails);

            // increment position dict
            const posKey = tails[8].map((k) => k.toString()).join(",");
            if (!tailTrace[posKey]) tailTrace[posKey] = 0;
            tailTrace[posKey]++;
        }
    });
    answer = Object.keys(tailTrace).length;
    return answer;
}

let content = fs.readFileSync(path.join(__dirname, `./day9.txt`)).toString();

// let part1Content = `R 4
// U 4
// L 3
// D 1
// R 4
// D 1
// L 5
// R 2`;

// let content = `R 5
// U 8
// L 8
// D 3
// R 17
// D 10
// L 25
// U 20`;

const part1Answer = part1(content.toString());
console.log("\n\nPart 1 Answer:", part1Answer);

const part2Answer = part2(content.toString());
console.log("\n\nPart 2 Answer:", part2Answer);
