"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_js_1 = require("../../utils.js");
function part1(input) {
    return simulateFishes(input, 80);
}
function part2(input) {
    return simulateFishes(input, 256);
}
function simulateFishes(input, stepCount) {
    var _a, _b, _c;
    let fishes = [];
    for (const state of input.map(x => parseInt(x))) {
        fishes[state] = ((_a = fishes[state]) !== null && _a !== void 0 ? _a : 0) + 1;
    }
    for (let i = 0; i < stepCount; i++) {
        const breedingFishesCount = (_b = fishes.shift()) !== null && _b !== void 0 ? _b : 0;
        fishes[6] = ((_c = fishes[6]) !== null && _c !== void 0 ? _c : 0) + breedingFishesCount;
        fishes[8] = breedingFishesCount;
    }
    return fishes.reduce((acc, cur) => acc + cur, 0);
}
(0, utils_js_1.runPuzzles)(part1, part2, 2021, 6, ',');
//# sourceMappingURL=puzzle.js.map