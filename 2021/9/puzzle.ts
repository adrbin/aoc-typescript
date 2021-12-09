import { runPuzzles } from '../../utils.js';

const adjacentVectors = [
  [0, -1],
  [0, 1],
  [-1, 0],
  [1, 0],
];

function part1(input: string[]) {
  const map = input.map(line => line.split('').map(x => parseInt(x)));
  let sum = 0;
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
      const point = map[i][j];
      if (
        adjacentVectors.every(
          ([dy, dx]) =>
            point < ((map[i + dy] ? map[i + dy][j + dx] : undefined) ?? 10),
        )
      ) {
        sum += point + 1;
      }
    }
  }
  return sum;
}

function part2(input: string[]) {
  const map = input.map(line => line.split('').map(x => parseInt(x)));
  let lowPoints: number[][] = [];
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
      const point = map[i][j];
      if (
        adjacentVectors.every(
          ([dy, dx]) =>
            point < ((map[i + dy] ? map[i + dy][j + dx] : undefined) ?? 10),
        )
      ) {
        lowPoints.push([i, j]);
      }
    }
  }

  const basinCounts = lowPoints
    .map(([y, x]) => countBasin([y, x], map))
    .sort((a, b) => b - a);

  return basinCounts[0] * basinCounts[1] * basinCounts[2];
}

function countBasin([lowPointY, lowPointX]: [number, number], map: number[][]) {
  const toVisit = [[lowPointY, lowPointX]];
  const visited = new Set<string>();

  let count = 0;

  while (toVisit.length > 0) {
    const [y, x] = toVisit.pop()!;
    if (visited.has(`${y},${x}`)) {
      continue;
    }

    visited.add(`${y},${x}`);
    count++;

    adjacentVectors
      .filter(
        ([dy, dx]) =>
          !visited.has(`${y + dy},${x + dx}`) &&
          map[y + dy] !== undefined &&
          map[y + dy][x + dx] !== 9 &&
          map[y + dy][x + dx] > map[y][x],
      )
      .forEach(([dy, dx]) => toVisit.push([y + dy, x + dx]));
  }

  return count;
}

runPuzzles(part1, part2, 2021, 9);
