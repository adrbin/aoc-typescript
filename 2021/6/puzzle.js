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
    let fishes = new Map();
    for (const state of input.map(x => parseInt(x))) {
        const count = (_a = fishes.get(state)) !== null && _a !== void 0 ? _a : 0;
        fishes.set(state, count + 1);
    }
    for (let i = 0; i < stepCount; i++) {
        const newFishes = new Map();
        for (const [state, count] of fishes) {
            if (state === 0) {
                const existingCount = (_b = newFishes.get(6)) !== null && _b !== void 0 ? _b : 0;
                newFishes.set(6, existingCount + count);
                newFishes.set(8, count);
                continue;
            }
            const existingCount = (_c = newFishes.get(state - 1)) !== null && _c !== void 0 ? _c : 0;
            newFishes.set(state - 1, existingCount + count);
        }
        fishes = newFishes;
    }
    return [...fishes.values()].reduce((acc, cur) => acc + cur);
}
(0, utils_js_1.runPuzzles)(part1, part2, 2021, 6, ',');
//# sourceMappingURL=puzzle.js.map