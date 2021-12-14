import { runPuzzles } from '../../utils.js';

function part1(input: string[]) {
  return simulatePolymers(input, 10);
}

function part2(input: string[]) {
  return simulatePolymers(input, 40);
}

function simulatePolymers(input: string[], stepsNumber: number) {
  let polymer = createPolymer(input[0]);
  const rules = createRules(input.slice(1));

  for (let i = 0; i < stepsNumber; i++) {
    polymer = step(polymer, rules);
  }

  const counts = countElements(polymer);

  const sortedCounts = [...counts.entries()].sort(
    ([_, count1], [__, count2]) => count1 - count2,
  );

  return sortedCounts[sortedCounts.length - 1][1] - sortedCounts[0][1];
}

function createPolymer(line: string) {
  const polymer = new Map<string, number>();
  line.split('').reduce((prev, cur) => {
    const elementCount = polymer.get(prev + cur) ?? 0;
    polymer.set(prev + cur, elementCount + 1);

    return cur;
  });

  return polymer;
}

function createRules(input: string[]) {
  const rules = new Map<string, string>();
  for (const line of input) {
    const [elementPair, element] = line.split(' -> ');
    rules.set(elementPair, element);
  }

  return rules;
}

function step(polymer: Map<string, number>, rules: Map<string, string>) {
  const newPolymer = new Map<string, number>();
  for (const [elementPair, count] of polymer) {
    const newElement = rules.get(elementPair);
    if (newElement === undefined) {
      newPolymer.set(elementPair, count);
      continue;
    }

    const newElement1 = elementPair[0] + newElement;
    const newElement1Count = newPolymer.get(newElement1) ?? 0;
    newPolymer.set(newElement1, newElement1Count + count);

    const newElement2 = newElement + elementPair[1];
    const newElement2Count = newPolymer.get(newElement2) ?? 0;
    newPolymer.set(newElement2, newElement2Count + count);
  }

  return newPolymer;
}

function countElements(polymer: Map<string, number>) {
  const counts = new Map<string, number>();

  for (const [elementPair, elementPairCount] of polymer) {
    for (const element of elementPair) {
      const elementCount = counts.get(element) ?? 0;
      counts.set(element, elementCount + elementPairCount);
    }
  }

  for (const [element, count] of counts) {
    counts.set(element, Math.ceil(count / 2));
  }

  return counts;
}

runPuzzles(part1, part2, 2021, 14);
