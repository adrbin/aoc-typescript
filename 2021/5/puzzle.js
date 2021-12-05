"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Board_instances, _Board_drawVerticalLine, _Board_drawHorizontalLine, _Board_drawDiagonalLine;
Object.defineProperty(exports, "__esModule", { value: true });
const utils_js_1 = require("../../utils.js");
function part1(input) {
    const board = new Board();
    for (const line of input) {
        const [point1, point2] = line.split('->').map(x => x.trim());
        const [x1, y1] = point1.split(',').map(x => parseInt(x));
        const [x2, y2] = point2.split(',').map(x => parseInt(x));
        board.drawLine(x1, y1, x2, y2, false);
    }
    return [...board.board.values()].filter(x => x > 1).length;
}
class Board {
    constructor() {
        _Board_instances.add(this);
        this.board = new Map();
    }
    drawLine(x1, y1, x2, y2, shouldconsiderDiagonals = true) {
        if (x1 === x2) {
            __classPrivateFieldGet(this, _Board_instances, "m", _Board_drawVerticalLine).call(this, x1, y1, y2);
            return;
        }
        if (y1 === y2) {
            __classPrivateFieldGet(this, _Board_instances, "m", _Board_drawHorizontalLine).call(this, x1, x2, y1);
            return;
        }
        if (!shouldconsiderDiagonals) {
            return;
        }
        if (x1 > x2) {
            [x1, y1, x2, y2] = [x2, y2, x1, y1];
        }
        if (x2 - x1 === Math.abs(y2 - y1)) {
            __classPrivateFieldGet(this, _Board_instances, "m", _Board_drawDiagonalLine).call(this, x1, y1, x2, y2);
            return;
        }
        throw new Error(`Incorrect line type with x1 = ${x1}, y1 = ${y1}, x2 = ${x2}, y2 = ${y2}`);
    }
}
_Board_instances = new WeakSet(), _Board_drawVerticalLine = function _Board_drawVerticalLine(x, y1, y2) {
    if (y1 > y2) {
        [y1, y2] = [y2, y1];
    }
    for (let i = y1; i <= y2; i++) {
        const address = `${x},${i}`;
        let count = this.board.get(address);
        if (count === undefined) {
            count = 0;
        }
        this.board.set(address, count + 1);
    }
}, _Board_drawHorizontalLine = function _Board_drawHorizontalLine(x1, x2, y) {
    if (x1 > x2) {
        [x1, x2] = [x2, x1];
    }
    for (let i = x1; i <= x2; i++) {
        const address = `${i},${y}`;
        let count = this.board.get(address);
        if (count === undefined) {
            count = 0;
        }
        this.board.set(address, count + 1);
    }
}, _Board_drawDiagonalLine = function _Board_drawDiagonalLine(x1, y1, x2, y2) {
    const sign = y1 < y2 ? 1 : -1;
    for (let i = 0; i <= x2 - x1; i++) {
        const address = `${x1 + i},${y1 + i * sign}`;
        let count = this.board.get(address);
        if (count === undefined) {
            count = 0;
        }
        this.board.set(address, count + 1);
    }
};
function part2(input) {
    const board = new Board();
    for (const line of input) {
        const [point1, point2] = line.split('->').map(x => x.trim());
        const [x1, y1] = point1.split(',').map(x => parseInt(x));
        const [x2, y2] = point2.split(',').map(x => parseInt(x));
        board.drawLine(x1, y1, x2, y2, true);
    }
    return [...board.board.values()].filter(x => x > 1).length;
}
(0, utils_js_1.runPuzzles)(part1, part2, 2021, 5);
//# sourceMappingURL=puzzle.js.map