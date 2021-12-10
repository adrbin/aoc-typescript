import { runPuzzles } from '../../utils.js';

const parentheses = {
  '(': {
    closing: ')',
    errorScore: 3,
    autocompleteScore: 1,
  },
  '[': {
    closing: ']',
    errorScore: 57,
    autocompleteScore: 2,
  },
  '{': {
    closing: '}',
    errorScore: 1197,
    autocompleteScore: 3,
  },
  '<': {
    closing: '>',
    errorScore: 25137,
    autocompleteScore: 4,
  },
};

type OpeningParenthesis = keyof typeof parentheses;

function part1(input: string[]) {
  let totalScore = 0;
  for (const line of input) {
    const stack: OpeningParenthesis[] = [];
    for (const char of line) {
      const parenthesisRecord = parentheses[char as OpeningParenthesis];
      if (parenthesisRecord) {
        stack.push(char as OpeningParenthesis);
        continue;
      }

      const lastParenthesis = stack.pop();

      if (
        lastParenthesis === undefined ||
        parentheses[lastParenthesis].closing !== char
      ) {
        const score = Object.values(parentheses).find(
          parenthesisRecord => parenthesisRecord.closing === char,
        )?.errorScore;

        if (score === undefined) {
          throw new Error(`Character ${char} is not a parenthesis`);
        }

        totalScore += score;
        break;
      }
    }
  }
  return totalScore;
}

function part2(input: string[]) {
  let scores: number[] = [];
  for (const line of input) {
    let stack: OpeningParenthesis[] = [];
    for (const char of line) {
      const parenthesisRecord = parentheses[char as OpeningParenthesis];
      if (parenthesisRecord) {
        stack.push(char as OpeningParenthesis);
        continue;
      }

      const lastParenthesis = stack.pop();

      if (
        lastParenthesis === undefined ||
        parentheses[lastParenthesis].closing !== char
      ) {
        stack = [];
        break;
      }
    }

    if (stack.length > 0) {
      let score = stack.reduceRight(
        (acc, cur) => acc * 5 + parentheses[cur].autocompleteScore,
        0,
      );

      scores.push(score);
    }
  }

  scores.sort((a, b) => a - b);
  return scores[Math.floor(scores.length / 2)];
}

runPuzzles(part1, part2, 2021, 10);
