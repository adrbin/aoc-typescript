"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_js_1 = require("../../utils.js");
const parentheses = {
    '(': {
        closing: ')',
        errorScore: 3,
        autocompleteScore: 1,
    },
    '[': {
        closing: ']',
        errorScore: 57,
        autocompleteScore: 2,
    },
    '{': {
        closing: '}',
        errorScore: 1197,
        autocompleteScore: 3,
    },
    '<': {
        closing: '>',
        errorScore: 25137,
        autocompleteScore: 4,
    },
};
function part1(input) {
    var _a;
    let totalScore = 0;
    for (const line of input) {
        const stack = [];
        for (const char of line) {
            const parenthesisRecord = parentheses[char];
            if (parenthesisRecord) {
                stack.push(char);
                continue;
            }
            const lastParenthesis = stack.pop();
            if (lastParenthesis === undefined ||
                parentheses[lastParenthesis].closing !== char) {
                const score = (_a = Object.values(parentheses).find(parenthesisRecord => parenthesisRecord.closing === char)) === null || _a === void 0 ? void 0 : _a.errorScore;
                if (score === undefined) {
                    throw new Error(`Character ${char} is not a parenthesis`);
                }
                totalScore += score;
                break;
            }
        }
    }
    return totalScore;
}
function part2(input) {
    let scores = [];
    for (const line of input) {
        let stack = [];
        for (const char of line) {
            const parenthesisRecord = parentheses[char];
            if (parenthesisRecord) {
                stack.push(char);
                continue;
            }
            const lastParenthesis = stack.pop();
            if (lastParenthesis === undefined ||
                parentheses[lastParenthesis].closing !== char) {
                stack = [];
                break;
            }
        }
        if (stack.length > 0) {
            let score = stack.reduceRight((acc, cur) => acc * 5 + parentheses[cur].autocompleteScore, 0);
            scores.push(score);
        }
    }
    scores.sort((a, b) => a - b);
    return scores[Math.floor(scores.length / 2)];
}
(0, utils_js_1.runPuzzles)(part1, part2, 2021, 10);
//# sourceMappingURL=puzzle.js.map