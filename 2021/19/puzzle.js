"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_js_1 = require("../../utils.js");
const rotations = [
    [1, 2, 3],
    [1, 3, 2],
    [2, 1, 3],
    [2, 3, 1],
    [3, 1, 2],
    [3, 2, 1],
    [-1, 2, 3],
    [-1, 3, 2],
    [-2, 1, 3],
    [-2, 3, 1],
    [-3, 1, 2],
    [-3, 2, 1],
    [1, -2, 3],
    [1, -3, 2],
    [2, -1, 3],
    [2, -3, 1],
    [3, -1, 2],
    [3, -2, 1],
    [1, 2, -3],
    [1, 3, -2],
    [2, 1, -3],
    [2, 3, -1],
    [3, 1, -2],
    [3, 2, -1],
    [-1, -2, -3],
    [-1, -3, -2],
    [-2, -1, -3],
    [-2, -3, -1],
    [-3, -1, -2],
    [-3, -2, -1],
    [-1, -2, 3],
    [-1, -3, 2],
    [-2, -1, 3],
    [-2, -3, 1],
    [-3, -1, 2],
    [-3, -2, 1],
    [1, -2, -3],
    [1, -3, -2],
    [2, -1, -3],
    [2, -3, -1],
    [3, -1, -2],
    [3, -2, -1],
    [-1, 2, -3],
    [-1, 3, -2],
    [-2, 1, -3],
    [-2, 3, -1],
    [-3, 1, -2],
    [-3, 2, -1],
];
function part1(input) {
    const scanners = parseScanners(input);
    const rotatedScanners = generateScannerRotations(scanners);
    const relativeRotatedScanners = generateRelativePositions(rotatedScanners);
    const { locatedBeacons } = locateScanners(rotatedScanners, relativeRotatedScanners);
    return locatedBeacons.length;
}
// returns scanners -> positions
function parseScanners(input) {
    const scanners = [];
    let lastScanner = [];
    for (const line of input.slice(1)) {
        if (line.startsWith('---')) {
            scanners.push(lastScanner);
            lastScanner = [];
        }
        else {
            lastScanner.push(line);
        }
    }
    scanners.push(lastScanner);
    return scanners;
}
// returns scanners -> rotations -> positions
function generateScannerRotations(scanners) {
    return scanners.map(scanner => rotations.map(rotation => scanner.map(position => {
        const positionArray = position.split(',').map(Number);
        return rotation
            .map(index => Math.sign(index) * positionArray[Math.abs(index) - 1])
            .join(',');
    })));
}
// returns scanners -> rotations -> positions -> relative positions
function generateRelativePositions(rotatedScanners) {
    return rotatedScanners.map(rotations => rotations.map(rotation => calculateRelativePositions(rotation)));
}
function locateScanners(rotatedScanners, relativeRotatedScanners) {
    const locatedBeacons = rotatedScanners[0][0];
    const locatedScanners = ['0,0,0'];
    rotatedScanners = rotatedScanners.slice(1);
    relativeRotatedScanners = relativeRotatedScanners.slice(1);
    loop: while (relativeRotatedScanners.length > 0) {
        const relativeLocatedBeacons = calculateRelativePositions(locatedBeacons);
        for (let i = 0; i < relativeRotatedScanners.length; i++) {
            for (let j = 0; j < relativeRotatedScanners[i].length; j++) {
                for (let k = 0; k < relativeRotatedScanners[i][j].length; k++) {
                    for (let l = 0; l < relativeLocatedBeacons.length; l++) {
                        let matchCount = 0;
                        for (const position of relativeRotatedScanners[i][j][k]) {
                            if (relativeLocatedBeacons[l].has(position)) {
                                matchCount++;
                            }
                        }
                        if (matchCount >= 12) {
                            const beaconPosition = rotatedScanners[i][j][k]
                                .split(',')
                                .map(Number);
                            const matchingPosition = locatedBeacons[l].split(',').map(Number);
                            const alignedScannerPosition = beaconPosition.map((beaconCoord, index) => matchingPosition[index] - beaconCoord);
                            locatedScanners.push(alignedScannerPosition.join(','));
                            const mappedBeacons = rotatedScanners[i][j].map(position => position
                                .split(',')
                                .map(Number)
                                .map((coord, index) => coord + alignedScannerPosition[index])
                                .join(','));
                            for (const beacon of mappedBeacons) {
                                if (!locatedBeacons.includes(beacon)) {
                                    locatedBeacons.push(beacon);
                                }
                            }
                            rotatedScanners.splice(i, 1);
                            relativeRotatedScanners.splice(i, 1);
                            continue loop;
                        }
                    }
                }
            }
        }
    }
    return { locatedBeacons, locatedScanners };
}
function calculateRelativePositions(positions) {
    return positions.map(position1 => new Set(positions.map(position2 => {
        const position1Array = position1.split(',').map(Number);
        const position2Array = position2.split(',').map(Number);
        return position1Array
            .map((_, i) => position2Array[i] - position1Array[i])
            .join(',');
    })));
}
function part2(input) {
    const scanners = parseScanners(input);
    const rotatedScanners = generateScannerRotations(scanners);
    const relativeRotatedScanners = generateRelativePositions(rotatedScanners);
    const { locatedScanners } = locateScanners(rotatedScanners, relativeRotatedScanners);
    const distances = locatedScanners.flatMap(scanner1 => {
        const position1 = scanner1.split(',').map(Number);
        return locatedScanners.map(scanner2 => {
            const position2 = scanner2.split(',').map(Number);
            return position1.reduce((acc, _, i) => acc + Math.abs(position1[i] - position2[i]), 0);
        });
    });
    return Math.max(...distances);
}
(0, utils_js_1.runPuzzles)(part1, part2, 2021, 19);
//# sourceMappingURL=puzzle.js.map