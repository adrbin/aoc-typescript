import { runPuzzles } from '../../utils.js';

function part1(input: string[]) {
  return input.flatMap(line =>
    line
      .split('|')[1]
      .trim()
      .split(' ')
      .filter(digit => [2, 3, 4, 7].includes(digit.length)),
  ).length;
}

function part2(input: string[]) {
  const segments: Record<string, number> = {
    '1110111': 0,
    '0010010': 1,
    '1011101': 2,
    '1011011': 3,
    '0111010': 4,
    '1101011': 5,
    '1101111': 6,
    '1010010': 7,
    '1111111': 8,
    '1111011': 9,
  };

  const letters: Record<string, number> = {
    a: 0,
    b: 1,
    c: 2,
    d: 3,
    e: 4,
    f: 5,
    g: 6,
  };

  const permutations = getPermutations(Array.from({ length: 7 }, (_, i) => i));
  let sum = 0;

  for (const line of input) {
    const [signals, outputs] = line.split('|').map(x => x.trim().split(' '));
    const patterns = signals
      .map(x => ({ digit: x, isOutput: false }))
      .concat(outputs.map(x => ({ digit: x, isOutput: true })));

    for (const permutation of permutations) {
      let number = '';
      for (const pattern of patterns) {
        const patternNumbers = pattern.digit.split('').map(x => letters[x]);
        const address = permutation
          .map(number => (patternNumbers.includes(number) ? '1' : '0'))
          .join('');
        if (segments[address] === undefined) {
          break;
        }

        if (pattern.isOutput) {
          number += segments[address].toString();
        }
      }

      if (number.length === 4) {
        sum += parseInt(number);
        break;
      }
    }
  }
  return sum;
}

function getPermutations<T>(array: T[]) {
  const result: T[][] = [];

  function permute(remaining: T[], used: T[] = []) {
    if (remaining.length === 0) {
      result.push(used);
    }

    for (let i = 0; i < remaining.length; i++) {
      const remainingCopy = [...remaining];
      remainingCopy.splice(i, 1);
      const newUsed = [...used, remaining[i]];

      permute(remainingCopy, newUsed);
    }
  }

  permute(array);

  return result;
}

runPuzzles(part1, part2, 2021, 8);
