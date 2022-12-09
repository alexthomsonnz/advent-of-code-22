import fs from "fs";
import path from "path";

let content = fs.readFileSync(path.join(__dirname, `./day9.txt`)).toString();

type Vector = [number, number];

function addVec(pos: Vector, vel: Vector): Vector {
    // Combine points
    return [pos[0] + vel[0], pos[1] + vel[1]];
}
function getVelocity(head: Vector, tail: Vector): Vector {
    // Get the direction from one point to another
    return [head[0] - tail[0], head[1] - tail[1]].map((num) =>
        clamp(num)
    ) as Vector;
}
function isAdjacent(head: Vector, tail: Vector): boolean {
    // Check if two points are adjacent
    var dx = Math.abs(head[0] - tail[0]),
        dy = Math.abs(head[1] - tail[1]);

    return dx <= 1 && dy <= 1;
}
function clamp(num: number) {
    // Clamp it
    return num <= -1 ? -1 : num >= 1 ? 1 : num;
}

function dragTail(tail: Vector, head: Vector): Vector {
    // Move tail towards head
    if (head !== tail && !isAdjacent(head, tail)) {
        tail = addVec(tail, getVelocity(head, tail));
    }
    return tail;
}

let headPos: Vector = [0, 0];

// Tails array. 0 -> closest to head
const tails = new Array<Vector>(9).fill([0, 0]);

const tailTrace: {
    [tailNumber: number]: {
        [tailPositionKey: string]: number;
    };
} = {};

const rows = content.split("\n");
rows.forEach((row) => {
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
        headPos = addVec(headPos, velocity);

        // Move all those tails
        for (let tailIndex = 0; tailIndex < tails.length; tailIndex++) {
            const tail = tails[tailIndex];
            let knotAhead = tails[tailIndex - 1];
            if (!knotAhead) knotAhead = headPos;

            tails[tailIndex] = dragTail(tail, knotAhead);

            const posKey = tails[tailIndex].map((k) => k.toString()).join(",");
            if (!tailTrace[tailIndex]) tailTrace[tailIndex] = {};
            if (!tailTrace[tailIndex][posKey]) tailTrace[tailIndex][posKey] = 0;
            tailTrace[tailIndex][posKey] += 1;
        }
    }
});

console.log("Part 1:", Object.keys(tailTrace[0]).length);
console.log("Part 2: ", Object.keys(tailTrace[8]).length);
