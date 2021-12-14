"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_js_1 = require("../../utils.js");
function part1(input) {
    return simulatePolymers(input, 10);
}
function part2(input) {
    return simulatePolymers(input, 40);
}
function simulatePolymers(input, stepsNumber) {
    let polymer = createPolymer(input[0]);
    const rules = createRules(input.slice(1));
    for (let i = 0; i < stepsNumber; i++) {
        polymer = step(polymer, rules);
    }
    const counts = countElements(polymer);
    const sortedCounts = [...counts.entries()].sort(([_, count1], [__, count2]) => count1 - count2);
    return sortedCounts[sortedCounts.length - 1][1] - sortedCounts[0][1];
}
function createPolymer(line) {
    const polymer = new Map();
    line.split('').reduce((prev, cur) => {
        var _a;
        const elementCount = (_a = polymer.get(prev + cur)) !== null && _a !== void 0 ? _a : 0;
        polymer.set(prev + cur, elementCount + 1);
        return cur;
    });
    return polymer;
}
function createRules(input) {
    const rules = new Map();
    for (const line of input) {
        const [elementPair, element] = line.split(' -> ');
        rules.set(elementPair, element);
    }
    return rules;
}
function step(polymer, rules) {
    var _a, _b;
    const newPolymer = new Map();
    for (const [elementPair, count] of polymer) {
        const newElement = rules.get(elementPair);
        if (newElement === undefined) {
            newPolymer.set(elementPair, count);
            continue;
        }
        const newElement1 = elementPair[0] + newElement;
        const newElement1Count = (_a = newPolymer.get(newElement1)) !== null && _a !== void 0 ? _a : 0;
        newPolymer.set(newElement1, newElement1Count + count);
        const newElement2 = newElement + elementPair[1];
        const newElement2Count = (_b = newPolymer.get(newElement2)) !== null && _b !== void 0 ? _b : 0;
        newPolymer.set(newElement2, newElement2Count + count);
    }
    return newPolymer;
}
function countElements(polymer) {
    var _a;
    const counts = new Map();
    for (const [elementPair, elementPairCount] of polymer) {
        for (const element of elementPair) {
            const elementCount = (_a = counts.get(element)) !== null && _a !== void 0 ? _a : 0;
            counts.set(element, elementCount + elementPairCount);
        }
    }
    for (const [element, count] of counts) {
        counts.set(element, Math.ceil(count / 2));
    }
    return counts;
}
(0, utils_js_1.runPuzzles)(part1, part2, 2021, 14);
//# sourceMappingURL=puzzle.js.map