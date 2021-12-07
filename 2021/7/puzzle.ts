import { runPuzzles } from '../../utils.js';

function part1(input: string[]) {
  const positionCounts: number[] = [];
  let minPosition = Infinity;
  let maxPosition = 0;
  for (const position of input.map(x => parseInt(x))) {
    positionCounts[position] = (positionCounts[position] ?? 0) + 1;
    if (position < minPosition) {
      minPosition = position;
    }
    if (position > maxPosition) {
      maxPosition = position;
    }
  }

  let fuel = calculateFuel(positionCounts, minPosition);
  let minFuel = fuel;
  let under = positionCounts[minPosition];
  let over = input.length - under;

  for (let position = minPosition + 1; position <= maxPosition; position++) {
    fuel += under - over;
    if (fuel < minFuel) {
      minFuel = fuel;
    }
    under += positionCounts[position] ?? 0;
    over -= positionCounts[position] ?? 0;
  }

  return minFuel;
}

function calculateFuel(positionCounts: number[], alignmentPosition: number) {
  return positionCounts.reduce(
    (acc, count, position) =>
      acc + Math.abs(position - alignmentPosition) * count,
    0,
  );
}

function part2(input: string[]) {
  const positions: number[] = [];
  let minPosition = Infinity;
  let maxPosition = 0;
  for (const position of input.map(x => parseInt(x))) {
    positions[position] = (positions[position] ?? 0) + 1;
    if (position < minPosition) {
      minPosition = position;
    }
    if (position > maxPosition) {
      maxPosition = position;
    }
  }

  let minFuel = Infinity;
  for (let position = minPosition + 1; position <= maxPosition; position++) {
    const fuel = calculateFuel2(positions, position);
    if (fuel < minFuel) {
      minFuel = fuel;
    }
  }

  return minFuel;
}

function calculateFuel2(positions: number[], alignmentPosition: number) {
  let fuel = 0;
  for (const [position, count] of positions.entries()) {
    if (count === undefined) {
      continue;
    }
    for (let i = 1; i <= Math.abs(position - alignmentPosition); i++) {
      fuel += i * count;
    }
  }

  return fuel;
}

runPuzzles(part1, part2, 2021, 7, ',');
