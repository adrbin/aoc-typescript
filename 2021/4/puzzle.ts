import { runPuzzles } from '../../utils.js';

interface Bingo {
  puzzle: number[][];
  numberPositions: Map<number, number[]>;
}

function part1(input: string[]) {
  const numbers = input[0].split(',').map(x => parseInt(x));
  const bingos = input.slice(1).map(x => parseBingo(x.split('\n')));

  let i = 0,
    winningBingos: Bingo[] = [];

  while (i < numbers.length) {
    winningBingos = calculateWinningBingos(numbers.slice(0, i + 1), bingos);

    if (winningBingos.length) {
      break;
    }

    i++;
  }

  if (!winningBingos.length) {
    throw new Error('Did not find a winning bingo');
  }

  return calculateFinalScore(numbers.slice(0, i + 1), winningBingos[0]);
}

function parseBingo(input: string[]) {
  const numberPositions = new Map<number, number[]>();
  const puzzle = input.map((line, lineIndex) =>
    line
      .trim()
      .split(/\s+/)
      .map((char, charIndex) => {
        const number = parseInt(char);
        numberPositions.set(number, [lineIndex, charIndex]);
        return number;
      }),
  );

  return { puzzle, numberPositions };
}

function calculateWinningBingos(numbers: number[], bingos: Bingo[]) {
  const currentNumber = numbers[numbers.length - 1];
  const numbersSet = new Set(numbers);
  const winningBingos: Bingo[] = [];
  for (const bingo of bingos) {
    const position = bingo.numberPositions.get(currentNumber);
    if (!position) {
      continue;
    }

    const [y, x] = position;

    let won = true;
    for (let i = 0; i < bingo.puzzle.length; i++) {
      if (!numbersSet.has(bingo.puzzle[i][x])) {
        won = false;
      }
    }

    if (won) {
      winningBingos.push(bingo);
      continue;
    }

    won = true;
    for (let i = 0; i < bingo.puzzle[y].length; i++) {
      if (!numbersSet.has(bingo.puzzle[y][i])) {
        won = false;
      }
    }

    if (won) {
      winningBingos.push(bingo);
    }
  }

  return winningBingos;
}

function calculateFinalScore(numbers: number[], bingo: Bingo) {
  const number = numbers[numbers.length - 1];
  const numbersSet = new Set(numbers);
  const bingoSum = bingo.puzzle
    .flatMap(x => x)
    .filter(x => !numbersSet.has(x))
    .reduce((acc, cur) => acc + cur, 0);

  return bingoSum * number;
}

function part2(input: string[]) {
  const numbers = input[0].split(',').map(x => parseInt(x));
  let bingos = input.slice(1).map(x => parseBingo(x.split('\n')));

  let i = 0,
    winningBingos: Bingo[] = [];

  while (i < numbers.length) {
    winningBingos = calculateWinningBingos(numbers.slice(0, i + 1), bingos);

    if (winningBingos.length) {
      bingos = bingos.filter(bingo => !winningBingos.includes(bingo));
    }

    if (bingos.length === 0) {
      break;
    }

    i++;
  }

  if (bingos.length) {
    throw new Error('Did not find a last winning bingo');
  }

  return calculateFinalScore(numbers.slice(0, i + 1), winningBingos[0]);
}

runPuzzles(part1, part2, 2021, 4, '\n\n');
