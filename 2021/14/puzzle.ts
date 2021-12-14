import { runPuzzles } from '../../utils.js';

function part1(input: string[]) {
  let polymer = input[0].split('');
  const rules = createRules(input.slice(1));

  for (let i = 0; i < 10; i++) {
    polymer = step(polymer, rules);
  }

  const counts = countElements(polymer);
  const sortedCounts = [...counts.entries()].sort(
    ([_, count1], [__, count2]) => count1 - count2,
  );

  return sortedCounts.at(-1)![1] - sortedCounts.at(0)![1];
}

function createRules(input: string[]) {
  const rules = new Map<string, string>();
  for (const line of input) {
    const [element1, element2] = line.split(' -> ');
    rules.set(element1, element2);
  }

  return rules;
}

function step(polymer: string[], rules: Map<string, string>) {
  const newPolymer: string[] = [polymer[0]];
  polymer.reduce((prev, cur) => {
    const newElement = rules.get(prev + cur);
    if (newElement !== undefined) {
      newPolymer.push(newElement);
    }

    newPolymer.push(cur);

    return cur;
  });

  return newPolymer;
}

function countElements(polymer: string[]) {
  const counts = new Map<string, number>();

  for (const element of polymer) {
    const count = counts.get(element) ?? 0;
    counts.set(element, count + 1);
  }

  return counts;
}

function part2(input: string[]) {
  let polymer = input[0].split('');
  const rules = createRules(input.slice(1));

  for (let i = 0; i < 40; i++) {
    polymer = step(polymer, rules);
  }

  const counts = countElements(polymer);
  const sortedCounts = [...counts.entries()].sort(
    ([_, count1], [__, count2]) => count1 - count2,
  );

  return sortedCounts.at(-1)![1] - sortedCounts.at(0)![1];
}

runPuzzles(part1, part2, 2021, 14);
