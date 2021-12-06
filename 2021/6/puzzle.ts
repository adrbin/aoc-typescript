import { runPuzzles } from '../../utils.js';

function part1(input: string[]) {
  return simulateFishes(input, 80);
}

function part2(input: string[]) {
  return simulateFishes(input, 256);
}

function simulateFishes(input: string[], stepCount: number) {
  let fishes: number[] = [];
  for (const state of input.map(x => parseInt(x))) {
    const count = fishes[state] ?? 0;
    fishes[state] = count + 1;
  }

  for (let i = 0; i < stepCount; i++) {
    const newFishes: number[] = [];
    fishes.forEach((count, state) => {
      if (state === 0) {
        const existingCount = newFishes[6] ?? 0;
        newFishes[6] = existingCount + count;
        newFishes[8] = count;
        return;
      }

      const existingCount = newFishes[state - 1] ?? 0;
      newFishes[state - 1] = existingCount + count;
    });

    fishes = newFishes;
  }

  return fishes.reduce((acc, cur) => acc + cur);
}

runPuzzles(part1, part2, 2021, 6, ',');
