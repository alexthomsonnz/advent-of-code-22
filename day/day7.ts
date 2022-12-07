import fs from "fs";
import path from "path";

function hasParent(cursor: string): boolean {
    return cursor !== "/";
}
function getParentDir(cursor: string) {
    cursor = cursor.slice(0, cursor.length - 1);
    cursor = cursor.slice(0, cursor.lastIndexOf("/")) as string;
    if (cursor !== "/") {
        cursor += "/";
    }
    return cursor;
}
function getFileTreeFromCommands(rows: string[]): Record<string, number> {
    const directorySizes = { "/": 0 };
    let cursor = "/";

    let totalDirSize = 0;

    rows.forEach((row, index) => {
        if (row.startsWith("$")) {
            if (row.startsWith("$ cd ")) {
                const command = row.replace("$ cd ", "");
                if (command === "/") {
                    cursor = "/";
                } else if (command === "..") {
                    cursor = getParentDir(cursor);
                } else {
                    cursor += command + "/";
                }
            }
        } else {
            const [size, name] = row.split(" ");
            if (row.startsWith("dir")) {
                // Init dir with size
                directorySizes[cursor + name + "/"] = 0;
                return;
            }
            totalDirSize += parseInt(size, 10);

            directorySizes[cursor] += parseInt(size, 10);
            let newCursor = getParentDir(cursor);
            while (hasParent(newCursor)) {
                directorySizes[newCursor] += parseInt(size, 10);
                newCursor = getParentDir(newCursor);
            }
        }
    });
    directorySizes["/"] = totalDirSize;
    return directorySizes;
}
function part1(input: string) {
    const rows = input.split("\n");

    const directorySizes = getFileTreeFromCommands(rows);

    let answer = 0;
    Object.keys(directorySizes).forEach((key) => {
        if (directorySizes[key] < 100000) {
            answer += directorySizes[key];
        }
    });
    return answer;
}

function part2(input: string) {
    const rows = input.split("\n");

    const directorySizes = getFileTreeFromCommands(rows);
    const totalDirSize = directorySizes["/"];

    let answer = 0;
    const candidates = [];
    Object.keys(directorySizes).forEach((key) => {
        if (totalDirSize - directorySizes[key] < 30000000) {
            candidates.push(directorySizes[key]);
        }
    });
    console.log(candidates);
    answer = Math.min(...candidates);

    return answer;
}

let content = fs.readFileSync(path.join(__dirname, `./day7.txt`)).toString();

const part1Answer = part1(content.toString());
console.log("\nPart 1 Answer:\n\n", part1Answer);

const part2Answer = part2(content.toString());
console.log("\nPart 2 Answer:\n\n", part2Answer);
