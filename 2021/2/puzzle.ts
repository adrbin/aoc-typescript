import { runPuzzles } from '../../utils.js';

function part1(input: string[]) {
  let horizontal = 0,
    depth = 0;
  const commands: Record<string, (value: number) => void> = {
    forward: (value: number) => (horizontal += value),
    down: (value: number) => (depth += value),
    up: (value: number) => (depth -= value),
  };

  for (const line of input) {
    const [command, value] = line.split(' ');
    commands[command](parseInt(value));
  }
  return horizontal * depth;
}

function part2(input: string[]) {
  let aim = 0,
    horizontal = 0,
    depth = 0;
  const commands: Record<string, (value: number) => void> = {
    forward: (value: number) => {
      horizontal += value;
      depth += aim * value;
    },
    down: (value: number) => (aim += value),
    up: (value: number) => (aim -= value),
  };

  for (const line of input) {
    const [command, value] = line.split(' ');
    commands[command](parseInt(value));
  }
  return horizontal * depth;
}

runPuzzles(part1, part2, 2021, 2);
