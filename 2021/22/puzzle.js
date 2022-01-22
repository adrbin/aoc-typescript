"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_js_1 = require("../../utils.js");
function part1(input) {
    const cubesToProcess = parseCubes(input).filter(cube => cube.position.every(coord => coord[0] >= -50 && coord[1] <= 50));
    const cubesOnGrid = placeCubesOnGrid(cubesToProcess);
    const count = countCubes(cubesOnGrid);
    return count;
}
function parseCubes(input) {
    return input.map(line => {
        const weight = line.startsWith('on') ? 1 : -1;
        const match = line.matchAll(/([\d-]+)..([\d-]+)/g);
        return {
            position: [...match].map(groups => [
                parseInt(groups[1]),
                parseInt(groups[2]),
            ]),
            weight,
        };
    });
}
function placeCubesOnGrid(cubes) {
    let cubesOnGrid = [];
    for (const cube of cubes) {
        const newCubesOnGrid = [...cubesOnGrid];
        for (const cubeOnGrid of cubesOnGrid) {
            const intersection = cube.position.map((_, i) => [
                Math.max(cube.position[i][0], cubeOnGrid.position[i][0]),
                Math.min(cube.position[i][1], cubeOnGrid.position[i][1]),
            ]);
            if (intersection.some(coordinate => coordinate[0] > coordinate[1])) {
                continue;
            }
            newCubesOnGrid.push({
                position: intersection,
                weight: -cubeOnGrid.weight,
            });
        }
        cubesOnGrid = newCubesOnGrid;
        if (cube.weight === 1) {
            cubesOnGrid.push(cube);
        }
    }
    return cubesOnGrid;
}
function countCubes(cubes) {
    return cubes.reduce((accCube, curCube) => accCube +
        curCube.weight *
            curCube.position.reduce((accCoord, curCoord) => accCoord * (curCoord[1] - curCoord[0] + 1), 1), 0);
}
function part2(input) {
    const cubesToProcess = parseCubes(input);
    const cubesOnGrid = placeCubesOnGrid(cubesToProcess);
    const count = countCubes(cubesOnGrid);
    return count;
}
(0, utils_js_1.runPuzzles)(part1, part2, 2021, 22);
//# sourceMappingURL=puzzle.js.map