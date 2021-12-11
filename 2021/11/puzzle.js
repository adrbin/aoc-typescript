"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_js_1 = require("../../utils.js");
const adjacentVectors = [
    [0, -1],
    [0, 1],
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [1, -1],
    [1, 0],
    [1, 1],
];
function part1(input) {
    const map = input.map(line => line.split('').map(x => parseInt(x)));
    let flashesCount = 0;
    for (let i = 0; i < 100; i++) {
        flashesCount += step(map);
    }
    return flashesCount;
}
function step(map) {
    const flashes = increaseEnergyLevels(map);
    const flashesCount = flash(flashes, map);
    resetFlashes(map);
    return flashesCount;
}
function increaseEnergyLevels(map) {
    const flashes = [];
    for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map[i].length; j++) {
            map[i][j]++;
            if (map[i][j] > 9) {
                flashes.push([i, j]);
            }
        }
    }
    return flashes;
}
function flash(flashes, map) {
    let flashesCount = 0;
    while (flashes.length > 0) {
        const [y, x] = flashes.pop();
        if (map[y][x] !== 10) {
            continue;
        }
        flashesCount++;
        for (const [dy, dx] of adjacentVectors) {
            if (map[y + dy] === undefined ||
                map[y + dy][x + dx] === undefined ||
                map[y + dy][x + dx] >= 10) {
                continue;
            }
            map[y + dy][x + dx]++;
            if (map[y + dy][x + dx] === 10) {
                flashes.push([y + dy, x + dx]);
            }
        }
    }
    return flashesCount;
}
function resetFlashes(map) {
    for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map[i].length; j++) {
            if (map[i][j] > 9) {
                map[i][j] = 0;
            }
        }
    }
}
function part2(input) {
    const map = input.map(line => line.split('').map(x => parseInt(x)));
    let i = 0;
    while (!isSynchronized(map)) {
        step(map);
        i++;
    }
    return i;
}
function isSynchronized(map) {
    for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map[i].length; j++) {
            if (map[i][j] !== 0) {
                return false;
            }
        }
    }
    return true;
}
(0, utils_js_1.runPuzzles)(part1, part2, 2021, 11);
//# sourceMappingURL=puzzle.js.map