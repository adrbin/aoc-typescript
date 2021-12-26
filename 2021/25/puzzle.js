"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_js_1 = require("../../utils.js");
var FieldType;
(function (FieldType) {
    FieldType["Empty"] = ".";
    FieldType["East"] = ">";
    FieldType["South"] = "v";
})(FieldType || (FieldType = {}));
function part1(input) {
    const map = input.map(line => line.split(''));
    let prevMap = map.map(y => y.map(x => FieldType.Empty));
    let currentMap = map;
    let i = 0;
    while (!compareArrays(prevMap, currentMap)) {
        prevMap = currentMap;
        currentMap = step(currentMap);
        i++;
    }
    return i;
}
function step(map) {
    const mapAfterMoveEast = moveEast(map);
    const mapAfterMoveSouth = moveSouth(mapAfterMoveEast);
    return mapAfterMoveSouth;
}
function moveEast(map) {
    const newMap = map.map(_ => []);
    for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map[i].length; j++) {
            if (newMap[i][j]) {
                continue;
            }
            if (map[i][j] !== FieldType.East ||
                map[i][(j + 1) % map[i].length] !== FieldType.Empty) {
                newMap[i][j] = map[i][j];
                continue;
            }
            newMap[i][j] = FieldType.Empty;
            newMap[i][(j + 1) % map[i].length] = map[i][j];
        }
    }
    return newMap;
}
function moveSouth(map) {
    const newMap = map.map(_ => []);
    for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map[i].length; j++) {
            if (newMap[i][j]) {
                continue;
            }
            if (map[i][j] !== FieldType.South ||
                map[(i + 1) % map.length][j] !== FieldType.Empty) {
                newMap[i][j] = map[i][j];
                continue;
            }
            newMap[i][j] = FieldType.Empty;
            newMap[(i + 1) % map.length][j] = map[i][j];
        }
    }
    return newMap;
}
function compareArrays(array1, array2) {
    for (let i = 0; i < array1.length; i++) {
        for (let j = 0; j < array1[i].length; j++) {
            if (array1[i][j] !== array2[i][j]) {
                return false;
            }
        }
    }
    return true;
}
function part2(input) {
    return '';
}
(0, utils_js_1.runPuzzles)(part1, part2, 2021, 25);
//# sourceMappingURL=puzzle.js.map