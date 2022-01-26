import { runPuzzles } from '../../utils.js';

interface Constant {
  divConst: number;
  addConst: number;
  addConst2: number;
}

enum Order {
  Ascending,
  Descending,
}

const constants: Constant[] = [
  {
    divConst: 1,
    addConst: 12,
    addConst2: 9,
  },
  {
    divConst: 1,
    addConst: 12,
    addConst2: 4,
  },
  {
    divConst: 1,
    addConst: 12,
    addConst2: 2,
  },
  {
    divConst: 26,
    addConst: -9,
    addConst2: 5,
  },
  {
    divConst: 26,
    addConst: -9,
    addConst2: 1,
  },
  {
    divConst: 1,
    addConst: 14,
    addConst2: 6,
  },
  {
    divConst: 1,
    addConst: 14,
    addConst2: 11,
  },
  {
    divConst: 26,
    addConst: -10,
    addConst2: 15,
  },
  {
    divConst: 1,
    addConst: 15,
    addConst2: 7,
  },
  {
    divConst: 26,
    addConst: -2,
    addConst2: 12,
  },
  {
    divConst: 1,
    addConst: 11,
    addConst2: 15,
  },
  {
    divConst: 26,
    addConst: -15,
    addConst2: 9,
  },
  {
    divConst: 26,
    addConst: -9,
    addConst2: 12,
  },
  {
    divConst: 26,
    addConst: -3,
    addConst2: 12,
  },
];

function part1(input: string[]) {
  const result = solveWs(Order.Descending);
  return result?.join('') ?? 'Did not found';
}

function part2(input: string[]) {
  const result = solveWs();
  return result?.join('') ?? 'Did not found';
}

function solveWs(
  order = Order.Ascending,
  z = 0,
  level = 0,
  cache = new Map<string, number[] | undefined>(),
) {
  if (z < 0 || z > 100000) {
    return undefined;
  }

  if (cache.size % 1000000 === 0) {
    console.log(cache.size);
  }

  const key = `${z},${level}`;

  if (cache.has(key)) {
    return cache.get(key);
  }

  if (level === 14) {
    const result = z === 0 ? [] : undefined;
    cache.set(key, result);
    return result;
  }

  let result: number[] | undefined;

  for (let i = 1; i < 10; i++) {
    const w = order === Order.Ascending ? i : 10 - i;
    const newZ = calculateZ(w, z, constants[level]);
    const nextWs = solveWs(order, newZ, level + 1, cache);
    if (nextWs !== undefined) {
      result = [w, ...nextWs];
      break;
    }
  }

  cache.set(key, result);
  return result;
}

function calculate(
  w: number,
  z: number,
  { divConst, addConst, addConst2 }: Constant,
) {
  let x = z % 26;
  z = Math.floor(z / divConst);
  x += addConst;
  x = x === w ? 0 : 1;
  let y = x * 25;
  y++;
  z = z * y;
  y = (w + addConst2) * x;
  z = z + y;

  return z;
}

function calculateZ(
  w: number,
  z: number,
  { divConst, addConst, addConst2 }: Constant,
) {
  const div = Math.floor(z / divConst);
  if (w === (z % 26) + addConst) {
    return div;
  }

  return 26 * div + w + addConst2;
}

runPuzzles(part1, part2, 2021, 24);
