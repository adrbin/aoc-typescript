import { runPuzzles } from '../../utils.js';

function part1(input: string[]) {
  const fishes = input.map(x => new Fish(parseInt(x)));
  for (let i = 0; i < 80; i++) {
    for (const fish of [...fishes]) {
      if (fish.step()) {
        fishes.push(new Fish(8));
      }
    }
  }
  return fishes.length;
}

class Fish {
  timer: number;

  constructor(timer: number) {
    this.timer = timer;
  }

  step() {
    if (this.timer === 0) {
      this.timer = 6;
      return true;
    }

    this.timer--;
    return false;
  }
}

function part2(input: string[]) {
  const fishes = input.map(x => new Fish(parseInt(x)));
  for (let i = 0; i < 256; i++) {
    for (const fish of [...fishes]) {
      if (fish.step()) {
        fishes.push(new Fish(8));
      }
    }
  }
  return fishes.length;
}

runPuzzles(part1, part2, 2021, 6, ',');
