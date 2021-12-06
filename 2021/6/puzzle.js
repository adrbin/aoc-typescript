"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_js_1 = require("../../utils.js");
function part1(input) {
    const fishes = input.map(x => new Fish(parseInt(x)));
    for (let i = 0; i < 80; i++) {
        for (const fish of [...fishes]) {
            if (fish.step()) {
                fishes.push(new Fish(8));
            }
        }
    }
    return fishes.length;
}
class Fish {
    constructor(timer) {
        this.timer = timer;
    }
    step() {
        if (this.timer === 0) {
            this.timer = 6;
            return true;
        }
        this.timer--;
        return false;
    }
}
function part2(input) {
    const fishes = input.map(x => new Fish(parseInt(x)));
    for (let i = 0; i < 256; i++) {
        for (const fish of [...fishes]) {
            if (fish.step()) {
                fishes.push(new Fish(8));
            }
        }
    }
    return fishes.length;
}
(0, utils_js_1.runPuzzles)(part1, part2, 2021, 6, ',');
//# sourceMappingURL=puzzle.js.map