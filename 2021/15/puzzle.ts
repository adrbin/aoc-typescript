import { runPuzzles } from '../../utils.js';

const adjacentVectors = [
  [0, -1],
  [0, 1],
  [-1, 0],
  [1, 0],
];

interface Node {
  cost: number;
  previous?: [number, number];
}

function part1(input: string[]) {
  const map = input.map(line => line.split('').map(x => parseInt(x)));
  const goal: [number, number] = [map.length - 1, map[0].length - 1];
  const nodes = aStar(goal, map);
  const cost = nodes.get(goal.join(','))?.cost;

  return cost ?? '';
}

function aStar(goal: [number, number], map: number[][]) {
  const nodes = new Map<string, Node>([['0,0', { cost: 0 }]]);
  const queue: [number, number][] = [[0, 0]];

  while (queue.length > 0) {
    const [currentIndex, current] = findMin(queue, nodes);
    queue.splice(currentIndex, 1);
    if (current.join(',') === goal.join(',')) {
      break;
    }

    const currentNode = nodes.get(current.join(','));

    if (!currentNode) {
      throw new Error('Could not find node data');
    }

    for (const [dy, dx] of adjacentVectors) {
      const adjacentNodeY = current[0] + dy;
      const adjacentNodeX = current[1] + dx;
      if (!map[adjacentNodeY] || !map[adjacentNodeY][adjacentNodeX]) {
        continue;
      }
      const adjacentNodeAddress = `${adjacentNodeY},${adjacentNodeX}`;
      const cost = currentNode.cost + map[adjacentNodeY][adjacentNodeX];
      if (cost < (nodes.get(adjacentNodeAddress) ?? Infinity)) {
        nodes.set(adjacentNodeAddress, {
          cost: cost,
          previous: current,
        });
        if (
          !queue.find(([y, x]) => y === adjacentNodeY && x === adjacentNodeX)
        ) {
          queue.push([adjacentNodeY, adjacentNodeX]);
        }
      }
    }
  }

  return nodes;
}

function findMin(queue: [number, number][], nodes: Map<string, Node>) {
  return [...queue.entries()].reduce(([minIndex, min], [curIndex, cur]) =>
    nodes.get(cur.join(','))!.cost < nodes.get(min.join(','))!.cost
      ? [curIndex, cur]
      : [minIndex, min],
  );
}

function part2(input: string[]) {
  const map = input.map(line => line.split('').map(x => parseInt(x)));
  const newMap = enhanceMap(map, 5);
  const goal: [number, number] = [newMap.length - 1, newMap[0].length - 1];
  const nodes = aStar(goal, newMap);
  const cost = nodes.get(goal.join(','))?.cost;

  return cost ?? '';
}

function enhanceMap(map: number[][], factor: number) {
  const newMap: number[][] = [];
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
      for (let k = 0; k < factor; k++) {
        for (let l = 0; l < factor; l++) {
          if (newMap[k * map.length + i] === undefined) {
            newMap[k * map.length + i] = [];
          }
          const value = map[i][j] + k + l;
          const wrappedValue = ((value - 1) % 9) + 1;
          newMap[k * map.length + i][l * map[i].length + j] = wrappedValue;
        }
      }
    }
  }

  return newMap;
}

runPuzzles(part1, part2, 2021, 15);
