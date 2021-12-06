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
    fishes[state] = (fishes[state] ?? 0) + 1;
  }

  for (let i = 0; i < stepCount; i++) {
    const breedingFishesCount = fishes.shift() ?? 0;
    fishes[6] = (fishes[6] ?? 0) + breedingFishesCount;
    fishes[8] = breedingFishesCount;
  }

  return fishes.reduce((acc, cur) => acc + cur);
}

runPuzzles(part1, part2, 2021, 6, ',');
