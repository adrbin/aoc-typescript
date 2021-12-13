import { runPuzzles } from '../../utils.js';

const foldAlongText = 'fold along ';

function part1(input: string[]) {
  let coordinates = new Set<string>();
  let i = 0;
  while (!input[i].startsWith(foldAlongText)) {
    coordinates.add(input[i++]);
  }

  const [direction, unit] = input[i].substring(foldAlongText.length).split('=');

  coordinates = fold(direction, parseInt(unit), coordinates);

  return coordinates.size;
}

function fold(direction: string, unit: number, coordinates: Set<string>) {
  const newCoordinates = new Set<string>();
  for (const coordinate of coordinates) {
    let [x, y] = coordinate.split(',').map(Number);

    if (direction === 'x' && x > unit) {
      x = 2 * unit - x;
    } else if (direction === 'y' && y > unit) {
      y = 2 * unit - y;
    }

    newCoordinates.add(`${x},${y}`);
  }

  return newCoordinates;
}

function printCoordinates(coordinates: Set<string>) {
  const textArray = ['\n'];
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 50; j++) {
      const char = coordinates.has(`${j},${i}`) ? '#' : '.';
      textArray.push(char);
    }
    textArray.push('\n');
  }

  return textArray.join('');
}

function part2(input: string[]) {
  let coordinates = new Set<string>();
  let i = 0;
  while (!input[i].startsWith(foldAlongText)) {
    coordinates.add(input[i++]);
  }

  while (i < input.length) {
    const [direction, unit] = input[i++]
      .substring(foldAlongText.length)
      .split('=');
    coordinates = fold(direction, parseInt(unit), coordinates);
  }

  const text = printCoordinates(coordinates);

  return text;
}

runPuzzles(part1, part2, 2021, 13);
