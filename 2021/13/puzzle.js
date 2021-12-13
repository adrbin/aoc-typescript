"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_js_1 = require("../../utils.js");
const foldAlongText = 'fold along ';
function part1(input) {
    let coordinates = new Set();
    let i = 0;
    while (!input[i].startsWith(foldAlongText)) {
        coordinates.add(input[i++]);
    }
    const [direction, unit] = input[i].substring(foldAlongText.length).split('=');
    coordinates = fold(direction, parseInt(unit), coordinates);
    return coordinates.size;
}
function fold(direction, unit, coordinates) {
    const newCoordinates = new Set();
    for (const coordinate of coordinates) {
        let [x, y] = coordinate.split(',').map(Number);
        if (direction === 'x' && x > unit) {
            x = 2 * unit - x;
        }
        else if (direction === 'y' && y > unit) {
            y = 2 * unit - y;
        }
        newCoordinates.add(`${x},${y}`);
    }
    return newCoordinates;
}
function printCoordinates(coordinates) {
    const textArray = ['\n'];
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 50; j++) {
            const char = coordinates.has(`${j},${i}`) ? '#' : '.';
            textArray.push(char);
        }
        textArray.push('\n');
    }
    return textArray.join('');
}
function part2(input) {
    let coordinates = new Set();
    let i = 0;
    while (!input[i].startsWith(foldAlongText)) {
        coordinates.add(input[i++]);
    }
    while (i < input.length) {
        const [direction, unit] = input[i++]
            .substring(foldAlongText.length)
            .split('=');
        coordinates = fold(direction, parseInt(unit), coordinates);
    }
    const text = printCoordinates(coordinates);
    return text;
}
(0, utils_js_1.runPuzzles)(part1, part2, 2021, 13);
//# sourceMappingURL=puzzle.js.map