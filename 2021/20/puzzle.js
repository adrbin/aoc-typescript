"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_js_1 = require("../../utils.js");
const adjacentVectors = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 0],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
];
function part1(input) {
    let { image, enhancementAlgorithm } = parseImage(input);
    for (let i = 0; i < 2; i++) {
        image = enhanceImage({ image, enhancementAlgorithm }, i);
    }
    return [...image.values()].filter(x => x === 1).length;
}
function parseImage(input) {
    const image = new Map();
    for (let i = 1; i < input.length; i++) {
        for (let j = 0; j < input[i].length; j++) {
            image.set(`${i},${j}`, input[i][j] === '#' ? 1 : 0);
        }
    }
    return { image, enhancementAlgorithm: input[0] };
}
function enhanceImage({ image, enhancementAlgorithm }, i) {
    const newImage = new Map();
    for (const [pixel, _] of image) {
        // if (image.get(pixel) === 0) continue;
        for (const [dy, dx] of adjacentVectors) {
            const [y, x] = pixel.split(',').map(Number);
            const [newY, newX] = [y + dy, x + dx];
            if (newImage.has(`${newY},${newX}`)) {
                continue;
            }
            const binaryCode = adjacentVectors
                .map(([newDy, newDx]) => calculatePixelValue(image, newY + newDy, newX + newDx, i))
                .join('');
            const code = parseInt(binaryCode, 2);
            newImage.set(`${newY},${newX}`, enhancementAlgorithm[code] === '#' ? 1 : 0);
        }
    }
    return newImage;
}
function calculatePixelValue(image, y, x, i) {
    var _a;
    const defaultValue = i % 2 === 1 ? 1 : 0;
    return (_a = image.get(`${y},${x}`)) !== null && _a !== void 0 ? _a : defaultValue;
    // const isEmpty = adjacentVectors.every(
    //   ([dy, dx]) => image.get(`${y + dy},${x + dx}`) !== 1,
    // );
    // if (i % 2 === 1 && isEmpty) {
    //   return 1;
    // }
    // return image.get(`${y},${x}`) ?? 0;
}
function part2(input) {
    let { image, enhancementAlgorithm } = parseImage(input);
    for (let i = 0; i < 50; i++) {
        image = enhanceImage({ image, enhancementAlgorithm }, i);
    }
    return [...image.values()].filter(x => x === 1).length;
}
(0, utils_js_1.runPuzzles)(part1, part2, 2021, 20);
//# sourceMappingURL=puzzle.js.map