"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_js_1 = require("../../utils.js");
function part1(input) {
    let count = 0;
    input
        .map(x => parseInt(x))
        .reduce((prev, cur) => {
        if (cur > prev) {
            count++;
        }
        return cur;
    });
    return count;
}
function part2(input) {
    const intInput = input.map(x => parseInt(x));
    let count = 0;
    let prevWindow = calculateWindow(intInput, 0);
    for (let i = 1; i < intInput.length - 2; i++) {
        const curWindow = calculateWindow(intInput, i);
        if (curWindow > prevWindow) {
            count++;
        }
        prevWindow = curWindow;
    }
    return count;
}
function calculateWindow(array, index) {
    return array[index] + array[index + 1] + array[index + 2];
}
(0, utils_js_1.runPuzzles)(part1, part2, 2021, 1);
//# sourceMappingURL=puzzle.js.map