import { runPuzzles } from '../../utils.js';

function part1(input: string[]) {
  const match = input[0].match(
    /target area: x=(-?\d+)..(-?\d+), y=(-?\d+)..(-?\d+)/,
  );
  const [targetXMin, targetXMax, targetYMin, targetYMax] = match!
    .slice(1)
    .map(x => parseInt(x));

  const initialMinX = Math.ceil((Math.sqrt(8 * targetXMin + 1) - 1) / 2);
  const initialMaxX = Math.floor((Math.sqrt(8 * targetXMax + 1) - 1) / 2);

  let maxY = 0;

  for (let initialY = 0; initialY < 100; initialY++) {
    for (let initialX = initialMinX; initialX <= initialMaxX; initialX++) {
      let y = initialY * initialX - (initialX * (initialX - 1)) / 2,
        dy = initialY - initialX;
      while (y >= targetYMin) {
        y += dy--;
        if (y >= targetYMin && y <= targetYMax) {
          const localMaxY =
            initialY * initialY - (initialY * (initialY - 1)) / 2;
          if (localMaxY > maxY) {
            maxY = localMaxY;
          }
          break;
        }
      }
    }
  }
  return maxY;
}

function part2(input: string[]) {
  const match = input[0].match(
    /target area: x=(-?\d+)..(-?\d+), y=(-?\d+)..(-?\d+)/,
  );
  const [targetXMin, targetXMax, targetYMin, targetYMax] = match!
    .slice(1)
    .map(x => parseInt(x));

  let count = 0;

  for (let initialY = targetYMin; initialY < 100; initialY++) {
    for (let initialX = 0; initialX <= targetXMax; initialX++) {
      let x = 0,
        y = 0,
        dy = initialY,
        dx = initialX;
      while (y >= targetYMin) {
        y += dy--;
        x += dx;

        if (dx > 0) {
          dx--;
        }

        if (
          x >= targetXMin &&
          x <= targetXMax &&
          y >= targetYMin &&
          y <= targetYMax
        ) {
          count++;
          break;
        }
      }
    }
  }
  return count;
}

runPuzzles(part1, part2, 2021, 17);
