"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_js_1 = require("../../utils.js");
var FieldType;
(function (FieldType) {
    FieldType["A"] = "A";
    FieldType["B"] = "B";
    FieldType["C"] = "C";
    FieldType["D"] = "D";
})(FieldType || (FieldType = {}));
const fieldData = {
    [FieldType.A]: {
        destination: 2,
        costFactor: 1,
    },
    [FieldType.B]: {
        destination: 4,
        costFactor: 10,
    },
    [FieldType.C]: {
        destination: 6,
        costFactor: 100,
    },
    [FieldType.D]: {
        destination: 8,
        costFactor: 1000,
    },
};
const destinations = Object.values(fieldData).map(({ destination }) => destination);
function part1() {
    const testFields = [
        [],
        [],
        [FieldType.B, FieldType.A],
        [],
        [FieldType.C, FieldType.D],
        [],
        [FieldType.B, FieldType.C],
        [],
        [FieldType.D, FieldType.A],
        [],
        [],
    ];
    const fields = [
        [],
        [],
        [FieldType.B, FieldType.C],
        [],
        [FieldType.A, FieldType.D],
        [],
        [FieldType.B, FieldType.D],
        [],
        [FieldType.C, FieldType.A],
        [],
        [],
    ];
    const minCost = solve(fields, 2);
    return minCost;
}
function solve(fields, maxSize) {
    let minCost = Infinity;
    const analyzed = new Set();
    function makeMove(fields, cost = 0) {
        if (didWin(fields, maxSize)) {
            if (cost < minCost) {
                minCost = cost;
            }
            return;
        }
        const key = `${cost},${JSON.stringify(fields)}`;
        if (analyzed.has(key)) {
            return;
        }
        moveToRoom(fields, cost);
        moveFromRoom(fields, cost);
        analyzed.add(key);
    }
    function moveToRoom(fields, cost) {
        mainLoop: for (let i = 0; i < fields.length; i++) {
            if (destinations.includes(i) || fields[i].length === 0) {
                continue;
            }
            const { destination, costFactor } = fieldData[fields[i][0]];
            if (fields[destination].some(field => field !== fields[i][0])) {
                continue;
            }
            let stepCount = 0;
            const step = destination > i ? 1 : -1;
            for (let j = i + step; (step === 1 && j < destination) || (step === -1 && j > destination); j += step) {
                stepCount++;
                if (destinations.includes(j)) {
                    continue;
                }
                if (fields[j].length !== 0) {
                    continue mainLoop;
                }
            }
            stepCount += maxSize - fields[destination].length + 1;
            const newFields = [...fields];
            newFields[i] = [];
            newFields[destination] = [...fields[destination], fields[i][0]];
            makeMove(newFields, cost + stepCount * costFactor);
        }
    }
    function moveFromRoom(fields, cost) {
        for (const destination of destinations) {
            if (fields[destination].length === 0 || // the line can be removed
                fields[destination].every(field => fieldData[field].destination === destination)) {
                continue;
            }
            const { costFactor } = fieldData[fields[destination][0]];
            let stepCount = maxSize - fields[destination].length + 1;
            moveFromRoomRight(fields, cost, destination, stepCount, costFactor);
            moveFromRoomLeft(fields, cost, destination, stepCount, costFactor);
        }
    }
    function moveFromRoomRight(fields, cost, destination, stepCount, costFactor) {
        for (let j = destination + 1; j < fields.length; j++) {
            stepCount++;
            if (destinations.includes(j)) {
                continue;
            }
            if (fields[j].length !== 0) {
                break;
            }
            const newFields = createNewFields(fields, destination, j);
            makeMove(newFields, cost + stepCount * costFactor);
        }
    }
    function moveFromRoomLeft(fields, cost, destination, stepCount, costFactor) {
        for (let j = destination - 1; j >= 0; j--) {
            stepCount++;
            if (destinations.includes(j)) {
                continue;
            }
            if (fields[j].length !== 0) {
                break;
            }
            const newFields = createNewFields(fields, destination, j);
            makeMove(newFields, cost + stepCount * costFactor);
        }
    }
    makeMove(fields);
    return minCost;
}
function createNewFields(fields, destination, j) {
    const newFields = [...fields];
    newFields[destination] = [...fields[destination]];
    newFields[destination].shift();
    newFields[j] = [fields[destination][0]];
    return newFields;
}
function didWin(fields, maxSize) {
    return Object.entries(fieldData).every(([fieldType, { destination }]) => fields[destination].length === maxSize &&
        fields[destination].every(field => field === fieldType));
}
function part2() {
    const testFields = [
        [],
        [],
        [FieldType.B, FieldType.D, FieldType.D, FieldType.A],
        [],
        [FieldType.C, FieldType.C, FieldType.B, FieldType.D],
        [],
        [FieldType.B, FieldType.B, FieldType.A, FieldType.C],
        [],
        [FieldType.D, FieldType.A, FieldType.C, FieldType.A],
        [],
        [],
    ];
    const fields = [
        [],
        [],
        [FieldType.B, FieldType.D, FieldType.D, FieldType.C],
        [],
        [FieldType.A, FieldType.C, FieldType.B, FieldType.D],
        [],
        [FieldType.B, FieldType.B, FieldType.A, FieldType.D],
        [],
        [FieldType.C, FieldType.A, FieldType.C, FieldType.A],
        [],
        [],
    ];
    const minCost = solve(fields, 4);
    return minCost;
}
(0, utils_js_1.runPuzzles)(part1, part2, 2021, 23);
//# sourceMappingURL=puzzle.js.map