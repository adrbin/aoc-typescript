"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_js_1 = require("../../utils.js");
const adjacentVectors = [
    [0, -1],
    [0, 1],
    [-1, 0],
    [1, 0],
];
function part1(input) {
    var _a;
    const map = input.map(line => line.split('').map(x => parseInt(x)));
    const goal = [map.length - 1, map[0].length - 1];
    const nodes = aStar(goal, map);
    const cost = (_a = nodes.get(goal.join(','))) === null || _a === void 0 ? void 0 : _a.cost;
    return cost !== null && cost !== void 0 ? cost : '';
}
function aStar(goal, map) {
    var _a;
    const nodes = new Map([['0,0', { cost: 0 }]]);
    const queue = [[0, 0]];
    while (queue.length > 0) {
        const [currentIndex, current] = findMin(queue, nodes);
        queue.splice(currentIndex, 1);
        if (current.join(',') === goal.join(',')) {
            break;
        }
        const currentNode = nodes.get(current.join(','));
        if (!currentNode) {
            throw new Error('Could not find node data');
        }
        for (const [dy, dx] of adjacentVectors) {
            const adjacentNodeY = current[0] + dy;
            const adjacentNodeX = current[1] + dx;
            if (!map[adjacentNodeY] || !map[adjacentNodeY][adjacentNodeX]) {
                continue;
            }
            const adjacentNodeAddress = `${adjacentNodeY},${adjacentNodeX}`;
            const cost = currentNode.cost + map[adjacentNodeY][adjacentNodeX];
            if (cost < ((_a = nodes.get(adjacentNodeAddress)) !== null && _a !== void 0 ? _a : Infinity)) {
                nodes.set(adjacentNodeAddress, {
                    cost: cost,
                    previous: current,
                });
                if (!queue.find(([y, x]) => y === adjacentNodeY && x === adjacentNodeX)) {
                    queue.push([adjacentNodeY, adjacentNodeX]);
                }
            }
        }
    }
    return nodes;
}
function findMin(queue, nodes) {
    return [...queue.entries()].reduce(([minIndex, min], [curIndex, cur]) => nodes.get(cur.join(',')).cost < nodes.get(min.join(',')).cost
        ? [curIndex, cur]
        : [minIndex, min]);
}
function part2(input) {
    var _a;
    const map = input.map(line => line.split('').map(x => parseInt(x)));
    const newMap = enhanceMap(map, 5);
    const goal = [newMap.length - 1, newMap[0].length - 1];
    const nodes = aStar(goal, newMap);
    const cost = (_a = nodes.get(goal.join(','))) === null || _a === void 0 ? void 0 : _a.cost;
    return cost !== null && cost !== void 0 ? cost : '';
}
function enhanceMap(map, factor) {
    const newMap = [];
    for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map[i].length; j++) {
            for (let k = 0; k < factor; k++) {
                for (let l = 0; l < factor; l++) {
                    if (newMap[k * map.length + i] === undefined) {
                        newMap[k * map.length + i] = [];
                    }
                    const value = map[i][j] + k + l;
                    const wrappedValue = ((value - 1) % 9) + 1;
                    newMap[k * map.length + i][l * map[i].length + j] = wrappedValue;
                }
            }
        }
    }
    return newMap;
}
(0, utils_js_1.runPuzzles)(part1, part2, 2021, 15);
//# sourceMappingURL=puzzle.js.map