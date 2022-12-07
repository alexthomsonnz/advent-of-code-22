import fs from "fs";
import assert from "assert";
import path from "path";
import { range } from "../helpers/range";

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
function part1(input: string) {
    const rows = input.split("\n");

    const directorySizes = { "/": 0 };
    let cursor = "/";

    rows.forEach((row, index) => {
        if (row.startsWith("$")) {
            if (row.startsWith("$ cd ")) {
                const command = row.trim().replace("$ cd ", "");
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

            directorySizes[cursor] += parseInt(size, 10);
            let newCursor = getParentDir(cursor);
            while (hasParent(newCursor) === true) {
                directorySizes[newCursor] += parseInt(size, 10);
                newCursor = getParentDir(newCursor);
            }
        }
    });
    console.log(directorySizes);

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

    const directorySizes = { "/": 0 };
    let cursor = "/";

    let totalDirSize = 0;

    rows.forEach((row, index) => {
        if (row.startsWith("$")) {
            if (row.startsWith("$ cd ")) {
                const command = row.trim().replace("$ cd ", "");
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
            while (hasParent(newCursor) === true) {
                directorySizes[newCursor] += parseInt(size, 10);
                newCursor = getParentDir(newCursor);
            }
        }
    });
    directorySizes["/"] = totalDirSize;
    console.log(directorySizes);

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

function main() {
    let content = fs
        .readFileSync(path.join(__dirname, `./day7.txt`))
        .toString();

    //     let content = `$ cd /
    // $ ls
    // dir a
    // 14848514 b.txt
    // 8504156 c.dat
    // dir d
    // $ cd a
    // $ ls
    // dir e
    // 29116 f
    // 2557 g
    // 62596 h.lst
    // $ cd e
    // $ ls
    // 584 i
    // $ cd ..
    // $ cd ..
    // $ cd d
    // $ ls
    // 4060174 j
    // 8033020 d.log
    // 5626152 d.ext
    // 7214296 k`;

    const part1Answer = part1(content.toString());
    console.log("\n\nPart 1 Answer:", part1Answer);

    const part2Answer = part2(content.toString());
    console.log("\n\nPart 2 Answer:", part2Answer);
}
main();
