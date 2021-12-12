"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_js_1 = require("../../utils.js");
function part1(input) {
    const graph = buildGraph(input);
    const count = countPaths(graph);
    return count;
}
function part2(input) {
    const graph = buildGraph(input);
    const count = countPaths(graph, true);
    return count;
}
function buildGraph(input) {
    var _a, _b;
    const graph = new Map();
    for (const line of input) {
        const [name1, name2] = line.split('-');
        const node1 = (_a = graph.get(name1)) !== null && _a !== void 0 ? _a : [];
        if (!node1.includes(name2)) {
            node1.push(name2);
            graph.set(name1, node1);
        }
        const node2 = (_b = graph.get(name2)) !== null && _b !== void 0 ? _b : [];
        if (!node2.includes(name1)) {
            node2.push(name1);
            graph.set(name2, node2);
        }
    }
    return graph;
}
function countPaths(graph, considerDoubleSmallCave = false) {
    let count = 0;
    function traverseGraph(visited, hasDoubleSmallCave = false) {
        var _a;
        const current = visited.at(-1);
        if (current === 'end') {
            count++;
            return;
        }
        (_a = graph
            .get(current)) === null || _a === void 0 ? void 0 : _a.filter(nextNode => nextNode === nextNode.toUpperCase() ||
            !visited.includes(nextNode) ||
            (considerDoubleSmallCave &&
                nextNode !== 'start' &&
                !hasDoubleSmallCave)).forEach(nextNode => traverseGraph([...visited, nextNode], hasDoubleSmallCave ||
            (nextNode === nextNode.toLowerCase() && visited.includes(nextNode))));
    }
    traverseGraph(['start']);
    return count;
}
(0, utils_js_1.runPuzzles)(part1, part2, 2021, 12);
//# sourceMappingURL=puzzle.js.map