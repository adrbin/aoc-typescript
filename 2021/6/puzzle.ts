import { runPuzzles } from '../../utils.js';

function part1(input: string[]) {
  return simulateFishes(input, 80);
}

function part2(input: string[]) {
  return simulateFishes(input, 256);
}

function simulateFishes(input: string[], stepCount: number) {
  let fishes = new Map<number, number>();
  for (const state of input.map(x => parseInt(x))) {
    const count = fishes.get(state) ?? 0;
    fishes.set(state, count + 1);
  }

  for (let i = 0; i < stepCount; i++) {
    const newFishes = new Map<number, number>();
    for (const [state, count] of fishes) {
      if (state === 0) {
        const existingCount = newFishes.get(6) ?? 0;
        newFishes.set(6, existingCount + count);
        newFishes.set(8, count);
        continue;
      }

      const existingCount = newFishes.get(state - 1) ?? 0;
      newFishes.set(state - 1, existingCount + count);
    }

    fishes = newFishes;
  }

  return [...fishes.values()].reduce((acc, cur) => acc + cur);
}

runPuzzles(part1, part2, 2021, 6, ',');
