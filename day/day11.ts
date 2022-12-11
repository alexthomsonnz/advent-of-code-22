import fs from "fs";
import assert from "assert";
import path from "path";

type MonkeyDict = {
    [monkey: number]: {
        holdingItems: number[];
        operation: (number: number) => number;
        test: (number: number) => boolean;
        trueMonekyDest: number;
        falseMonkeyDest: number;
        inspections: number;
        divisor: number;
    };
};

function setupRow(row: string) {
    var monkeyNum = parseInt(
        row
            .substring(
                row.indexOf("Monkey") + 1,
                row.indexOf("\n", row.indexOf("Monkey"))
            )
            .match(/[0-9]+/g)[0],
        10
    );
    var startingItems = row
        .substring(
            row.indexOf("Starting items:") + 1,
            row.indexOf("\n", row.indexOf("Starting items:"))
        )
        .match(/[0-9]+/g)
        .map((items) => parseInt(items, 10));

    var operationRow = row.substring(
        row.indexOf("Operation:") + 1,
        row.indexOf("\n", row.indexOf("Operation:"))
    );
    var match = row
        .substring(
            row.indexOf("Operation:") + 1,
            row.indexOf("\n", row.indexOf("Operation:"))
        )
        .match(/[0-9]+/g);

    let operationNum: "old" | number;
    if (match && match.length) {
        operationNum = parseInt(match[0], 10);
    } else {
        operationNum = "old";
    }

    var test = parseInt(
        row
            .substring(
                row.indexOf("Test:") + 1,
                row.indexOf("\n", row.indexOf("Test:"))
            )
            .match(/[0-9]+/g)[0],
        10
    );
    var trueMonekyDest = parseInt(
        row
            .substring(
                row.indexOf("If true: throw to monkey") + 1,
                row.indexOf("\n", row.indexOf("If true: throw to monkey"))
            )
            .match(/[0-9]+/g)[0],
        10
    );
    var falseMonkeyDest = parseInt(
        row
            .substring(row.indexOf("If false: throw to monkey") + 1, row.length)
            .match(/[0-9]+/g)[0],
        10
    );

    return {
        monkeyNum,
        startingItems,
        operationNum,
        operationRow,
        test,
        trueMonekyDest,
        falseMonkeyDest,
    };
}

function setupMonkeyDict(input) {
    const monkeyItems: MonkeyDict = {};
    // Setup dict
    const rows = input.split("\n\n");
    rows.forEach((row, index) => {
        const {
            monkeyNum,
            startingItems,
            operationNum,
            operationRow,
            test,
            trueMonekyDest,
            falseMonkeyDest,
        } = setupRow(row);

        monkeyItems[monkeyNum] = {
            holdingItems: startingItems,
            operation: (num: number) => {
                const mut =
                    typeof operationNum === "string" ? num : operationNum;

                if (operationRow.includes(" + ")) return num + mut;
                if (operationRow.includes(" - ")) return num - mut;
                if (operationRow.includes(" * ")) return num * mut;
                if (operationRow.includes(" / ")) return num / mut;
                throw new Error();
            },
            test: (number) => number % test === 0,
            divisor: test,
            trueMonekyDest,
            falseMonkeyDest,
            inspections: 0,
        };
    });
    return monkeyItems;
}

function doRound(monkeysDict: MonkeyDict, worryFunction: (number) => number) {
    Object.keys(monkeysDict).forEach((key) => {
        const monkey = monkeysDict[key as any as number];
        for (const item of monkey.holdingItems) {
            const newNum = worryFunction(monkey.operation(item));
            const testResult = monkey.test(newNum);
            monkeysDict[
                testResult ? monkey.trueMonekyDest : monkey.falseMonkeyDest
            ].holdingItems.push(newNum);

            monkey.inspections++;
        }
        monkey.holdingItems = [];
    });

    // Return inspections
    return Object.keys(monkeysDict)
        .map((key) => monkeysDict[key].inspections)
        .sort((a, b) => b - a);
}

// Do monkey business
function getMonkeyBusiness(
    monkeysDict: MonkeyDict,
    worryFunction: (number) => number,
    numberOfRounds = 10000
) {
    for (let i = 0; i < numberOfRounds; i++) {
        doRound(monkeysDict, worryFunction);
    }

    const inspections = Object.keys(monkeysDict)
        .map((key) => monkeysDict[key].inspections)
        .sort((a, b) => b - a);

    return inspections[0] * inspections[1];
}

function main(input: string) {
    let monkeyDict = setupMonkeyDict(input);

    console.log(
        "\n\nPart 1 answer: ",
        getMonkeyBusiness(monkeyDict, (num) => Math.floor(num / 3), 20)
    );

    // Part 2
    // Going to leave this here. I was trying to bruteforce guess a new worry function to use
    // For whatever reason, js was happy to run this 10,000 times, but it gave me the monkeyBusiness number?

    // Make some random worry functions
    // const worryFunctions = [(num) => num];
    // for (let i = 0; i < 100000; i++) {
    //     // worryFunctions.push((num) => num / i);
    //     // worryFunctions.push((num) => num - i);
    //     worryFunctions.push((num) => num % i);
    // }

    // let candidateWorryFunctions: Array<(num: number) => number> = [];
    // worryFunctions.forEach((func) => {
    //     monkeyDict = setupMonkeyDict(input);
    //     const inspections = doRound(monkeyDict, func);
    //     if (inspections[0] === 6 && inspections[1] === 4) {
    //         // Found one that worked
    //         candidateWorryFunctions.push(func);
    //     }
    // });

    // candidateWorryFunctions.forEach((func) => {
    //     if (!!worryFunction) return;
    //     monkeyDict = setupMonkeyDict(input);
    //     if (getMonkeyBusiness(monkeyDict, func as any, 10000) === 2713310158) {
    //         // Found THE function
    //         worryFunction = func;
    //     }
    // });

    monkeyDict = setupMonkeyDict(input);

    let mod = 1;
    for (const key in monkeyDict) {
        mod *= monkeyDict[key].divisor;
    }

    let worryFunction = (num: number) => num % mod;

    console.log(
        "\n\nPart 2 answer: ",
        getMonkeyBusiness(monkeyDict, worryFunction, 10_000)
    );

    return 0;
}

let content = fs.readFileSync(path.join(__dirname, `./day11.txt`)).toString();

main(content);
