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
    var _a;
    let fishes = [];
    for (const state of input.map(x => parseInt(x))) {
        const count = (_a = fishes[state]) !== null && _a !== void 0 ? _a : 0;
        fishes[state] = count + 1;
    }
    for (let i = 0; i < stepCount; i++) {
        const newFishes = [];
        fishes.forEach((count, state) => {
            var _a, _b;
            if (state === 0) {
                const existingCount = (_a = newFishes[6]) !== null && _a !== void 0 ? _a : 0;
                newFishes[6] = existingCount + count;
                newFishes[8] = count;
                return;
            }
            const existingCount = (_b = newFishes[state - 1]) !== null && _b !== void 0 ? _b : 0;
            newFishes[state - 1] = existingCount + count;
        });
        fishes = newFishes;
    }
    return fishes.reduce((acc, cur) => acc + cur);
}
(0, utils_js_1.runPuzzles)(part1, part2, 2021, 6, ',');
//# sourceMappingURL=puzzle.js.map