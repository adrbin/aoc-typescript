"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.runPuzzles = exports.readFile = void 0;
const fs_1 = require("fs");
const path = __importStar(require("path"));
function readFile(path, separator) {
    return __awaiter(this, void 0, void 0, function* () {
        return (yield fs_1.promises.readFile(path, 'utf8'))
            .split(separator)
            .filter(x => x);
    });
}
exports.readFile = readFile;
function runPuzzles(part1, part2, year, day, separator = '\n') {
    return __awaiter(this, void 0, void 0, function* () {
        const inputFile = path.join(year.toString(), day.toString(), 'input.txt');
        const input = yield readFile(inputFile, separator);
        console.time('part 1');
        const part1Result = part1(input);
        console.timeEnd('part 1');
        console.log(`part 1 result: ${part1Result}`);
        console.time('part 2');
        const part2Result = part2(input);
        console.timeEnd('part 2');
        console.log(`part 2 result: ${part2Result}`);
    });
}
exports.runPuzzles = runPuzzles;
//# sourceMappingURL=utils.js.map