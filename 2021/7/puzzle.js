"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_js_1 = require("../../utils.js");
function part1(input) {
    var _a, _b, _c;
    const positionCounts = [];
    let minPosition = Infinity;
    let maxPosition = 0;
    for (const position of input.map(x => parseInt(x))) {
        positionCounts[position] = ((_a = positionCounts[position]) !== null && _a !== void 0 ? _a : 0) + 1;
        if (position < minPosition) {
            minPosition = position;
        }
        if (position > maxPosition) {
            maxPosition = position;
        }
    }
    let fuel = calculateFuel(positionCounts, minPosition);
    let minFuel = fuel;
    let under = positionCounts[minPosition];
    let over = input.length - under;
    for (let position = minPosition + 1; position <= maxPosition; position++) {
        fuel += under - over;
        if (fuel < minFuel) {
            minFuel = fuel;
        }
        under += (_b = positionCounts[position]) !== null && _b !== void 0 ? _b : 0;
        over -= (_c = positionCounts[position]) !== null && _c !== void 0 ? _c : 0;
    }
    return minFuel;
}
function calculateFuel(positionCounts, alignmentPosition) {
    return positionCounts.reduce((acc, count, position) => acc + Math.abs(position - alignmentPosition) * count, 0);
}
function part2(input) {
    var _a;
    const positions = [];
    let minPosition = Infinity;
    let maxPosition = 0;
    for (const position of input.map(x => parseInt(x))) {
        positions[position] = ((_a = positions[position]) !== null && _a !== void 0 ? _a : 0) + 1;
        if (position < minPosition) {
            minPosition = position;
        }
        if (position > maxPosition) {
            maxPosition = position;
        }
    }
    let minFuel = Infinity;
    for (let position = minPosition + 1; position <= maxPosition; position++) {
        const fuel = calculateFuel2(positions, position);
        if (fuel < minFuel) {
            minFuel = fuel;
        }
    }
    return minFuel;
}
function calculateFuel2(positions, alignmentPosition) {
    let fuel = 0;
    for (const [position, count] of positions.entries()) {
        if (count === undefined) {
            continue;
        }
        for (let i = 1; i <= Math.abs(position - alignmentPosition); i++) {
            fuel += i * count;
        }
    }
    return fuel;
}
(0, utils_js_1.runPuzzles)(part1, part2, 2021, 7, ',');
//# sourceMappingURL=puzzle.js.map