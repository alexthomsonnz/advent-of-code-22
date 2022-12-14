import fs from "fs";
import assert from "assert";
import path from "path";

let content = fs.readFileSync(path.join(__dirname, `./day14.txt`)).toString();
// let content = `498,4 -> 498,6 -> 496,6
// 503,4 -> 502,4 -> 502,9 -> 494,9`;
// Part 1

function coordToXY(pos: string) {
    const [x, y] = pos.split(",").map((num) => Number(num));
    return [x, y];
}

function clamp(num: number) {
    // Clamp it
    return num <= -1 ? -1 : num >= 1 ? 1 : num;
}

function getLineBetweeCoords(a: string, b: string): string[] {
    const [x1, y1] = coordToXY(a);
    const [x2, y2] = coordToXY(b);

    let differenceX = x2 - x1;
    let differenceY = y2 - y1;

    const velX = clamp(differenceX);
    const velY = clamp(differenceY);
    const coords = [a, b];

    for (
        let i = 1;
        i < Math.max(Math.abs(differenceX), Math.abs(differenceY));
        i++
    ) {
        coords.push(`${x1 + velX * i},${y1 + velY * i}`);
    }

    return coords;
}

function setupGraph() {
    const graph: {
        [coord: string]: "#" | "o";
    } = {};

    // Draw rocks
    content.split("\n").forEach((row) => {
        const coords = row.split("->").map((str) => str.trim());
        coords.forEach((coord, index) => {
            if (index === 0) return;
            const lastCoord = coords[index - 1];
            const pathCoords = getLineBetweeCoords(coord, lastCoord);

            pathCoords.forEach((coord) => {
                graph[coord] = "#";
            });
        });
    });

    return graph;
}

let graph = setupGraph();

const abyssY = Math.max(
    ...Object.keys(graph).map((coord) => coordToXY(coord)[1])
);

function moveSand(coord: string, maxY: number): string {
    const [x, y] = coordToXY(coord);

    if (y > maxY) {
        return coord;
    }

    const down = `${x},${y + 1}`;
    const downAndLeft = `${x - 1},${y + 1}`;
    const downAndRight = `${x + 1},${y + 1}`;
    for (const newPoint of [down, downAndLeft, downAndRight]) {
        if (!graph[newPoint]) {
            return moveSand(newPoint, maxY);
        }
    }

    return coord;
}

let sandDropped = 0;
let abyss = false;

while (!abyss) {
    sandDropped += 1;
    // Drop a sand
    const newSandCoord = moveSand("500,0", abyssY);

    if (coordToXY(newSandCoord)[1] > abyssY) {
        abyss = true;
    }
    graph[newSandCoord] = "o";
}

console.log("\n\nPart 1 Answer:", sandDropped - 1);

// Part 2

const floorY = abyssY + 2;
graph = setupGraph();

let part2SandDropped = 0;
let reached = false;

while (!reached) {
    part2SandDropped += 1;
    // Drop a sand
    const newSandCoord = moveSand("500,0", floorY - 2);

    if (newSandCoord === "500,0") {
        reached = true;
    }
    graph[newSandCoord] = "o";
}

console.log("\n\nPart 2 Answer:", part2SandDropped);
