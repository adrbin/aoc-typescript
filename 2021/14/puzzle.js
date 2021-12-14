"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_js_1 = require("../../utils.js");
function part1(input) {
    let polymer = input[0].split('');
    const rules = createRules(input.slice(1));
    for (let i = 0; i < 10; i++) {
        polymer = step(polymer, rules);
    }
    const counts = countElements(polymer);
    const sortedCounts = [...counts.entries()].sort(([_, count1], [__, count2]) => count1 - count2);
    return sortedCounts.at(-1)[1] - sortedCounts.at(0)[1];
}
function createRules(input) {
    const rules = new Map();
    for (const line of input) {
        const [element1, element2] = line.split(' -> ');
        rules.set(element1, element2);
    }
    return rules;
}
function step(polymer, rules) {
    const newPolymer = [polymer[0]];
    polymer.reduce((prev, cur) => {
        const newElement = rules.get(prev + cur);
        if (newElement !== undefined) {
            newPolymer.push(newElement);
        }
        newPolymer.push(cur);
        return cur;
    });
    return newPolymer;
}
function countElements(polymer) {
    var _a;
    const counts = new Map();
    for (const element of polymer) {
        const count = (_a = counts.get(element)) !== null && _a !== void 0 ? _a : 0;
        counts.set(element, count + 1);
    }
    return counts;
}
function part2(input) {
    let polymer = input[0].split('');
    const rules = createRules(input.slice(1));
    for (let i = 0; i < 40; i++) {
        polymer = step(polymer, rules);
    }
    const counts = countElements(polymer);
    const sortedCounts = [...counts.entries()].sort(([_, count1], [__, count2]) => count1 - count2);
    return sortedCounts.at(-1)[1] - sortedCounts.at(0)[1];
}
(0, utils_js_1.runPuzzles)(part1, part2, 2021, 14);
//# sourceMappingURL=puzzle.js.map