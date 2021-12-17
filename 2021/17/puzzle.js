"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_js_1 = require("../../utils.js");
function part1(input) {
    const match = input[0].match(/target area: x=(-?\d+)..(-?\d+), y=(-?\d+)..(-?\d+)/);
    const [targetXMin, targetXMax, targetYMin, targetYMax] = match
        .slice(1)
        .map(x => parseInt(x));
    const initialMinX = Math.ceil((Math.sqrt(8 * targetXMin + 1) - 1) / 2);
    const initialMaxX = Math.floor((Math.sqrt(8 * targetXMax + 1) - 1) / 2);
    let maxY = 0;
    // for (let initialY = 0; initialY < 100; initialY++) {
    //   for (let initialX = initialMinX; initialX <= initialMaxX; initialX++) {
    //     const yAtInitialX = initialY * initialX - (initialX * (initialX - 1)) / 2;
    //     const fallingDownMin = Math.floor(
    //       (Math.sqrt(8 * (yAtInitialX - targetYMax) + 1) - 1) / 2,
    //     );
    //     const fallingDownMax = Math.floor(
    //       (Math.sqrt(8 * (yAtInitialX - targetYMin) + 1) - 1) / 2,
    //     );
    //     if (
    //       (yAtInitialX > targetYMin && yAtInitialX < targetYMax) ||
    //       fallingDownMin !== fallingDownMax
    //     ) {
    //       const localMaxY = initialY * initialY - (initialY * (initialY - 1)) / 2;
    //       if (localMaxY > maxY) {
    //         maxY = localMaxY;
    //       }
    //     }
    //   }
    // }
    for (let initialY = 0; initialY < 100; initialY++) {
        for (let initialX = initialMinX; initialX <= initialMaxX; initialX++) {
            let x = 0, y = 0, dy = initialY, dx = initialX;
            let wasTargetHit = false;
            while (y >= targetYMin) {
                y += dy--;
                x += dx;
                if (dx > 0) {
                    dx--;
                }
                if (x >= targetXMin &&
                    x <= targetXMax &&
                    y >= targetYMin &&
                    y <= targetYMax) {
                    wasTargetHit = true;
                    break;
                }
            }
            if (wasTargetHit) {
                const localMaxY = initialY * initialY - (initialY * (initialY - 1)) / 2;
                if (localMaxY > maxY) {
                    maxY = localMaxY;
                }
            }
        }
    }
    return maxY;
}
function part2(input) {
    const match = input[0].match(/target area: x=(-?\d+)..(-?\d+), y=(-?\d+)..(-?\d+)/);
    const [targetXMin, targetXMax, targetYMin, targetYMax] = match
        .slice(1)
        .map(x => parseInt(x));
    let count = 0;
    for (let initialY = targetYMin; initialY < 100; initialY++) {
        for (let initialX = 0; initialX <= targetXMax; initialX++) {
            let x = 0, y = 0, dy = initialY, dx = initialX;
            while (y >= targetYMin) {
                y += dy--;
                x += dx;
                if (dx > 0) {
                    dx--;
                }
                if (x >= targetXMin &&
                    x <= targetXMax &&
                    y >= targetYMin &&
                    y <= targetYMax) {
                    count++;
                    break;
                }
            }
        }
    }
    return count;
}
(0, utils_js_1.runPuzzles)(part1, part2, 2021, 17);
//# sourceMappingURL=puzzle.js.map