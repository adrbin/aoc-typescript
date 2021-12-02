"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_js_1 = require("../../utils.js");
function part1(input) {
    let horizontal = 0, depth = 0;
    const commands = {
        forward: (value) => (horizontal += value),
        down: (value) => (depth += value),
        up: (value) => (depth -= value),
    };
    for (const line of input) {
        const [command, value] = line.split(' ');
        commands[command](parseInt(value));
    }
    return horizontal * depth;
}
function part2(input) {
    let aim = 0, horizontal = 0, depth = 0;
    const commands = {
        forward: (value) => {
            horizontal += value;
            depth += aim * value;
        },
        down: (value) => (aim += value),
        up: (value) => (aim -= value),
    };
    for (const line of input) {
        const [command, value] = line.split(' ');
        commands[command](parseInt(value));
    }
    return horizontal * depth;
}
(0, utils_js_1.runPuzzles)(part1, part2, 2021, 2);
//# sourceMappingURL=puzzle.js.map