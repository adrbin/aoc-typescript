import { runPuzzles } from '../../utils.js';

const adjacentVectors = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 0],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1],
];

interface ImageInput {
  image: Map<string, number>;
  enhancementAlgorithm: string;
}

function part1(input: string[]) {
  let { image, enhancementAlgorithm } = parseImage(input);
  for (let i = 0; i < 2; i++) {
    image = enhanceImage({ image, enhancementAlgorithm }, i);
  }
  return [...image.values()].filter(x => x === 1).length;
}

function parseImage(input: string[]): ImageInput {
  const image = new Map<string, number>();
  for (let i = 1; i < input.length; i++) {
    for (let j = 0; j < input[i].length; j++) {
      image.set(`${i},${j}`, input[i][j] === '#' ? 1 : 0);
    }
  }

  return { image, enhancementAlgorithm: input[0] };
}

function enhanceImage({ image, enhancementAlgorithm }: ImageInput, i: number) {
  const newImage = new Map<string, number>();
  for (const [pixel, _] of image) {
    // if (image.get(pixel) === 0) continue;
    for (const [dy, dx] of adjacentVectors) {
      const [y, x] = pixel.split(',').map(Number);
      const [newY, newX] = [y + dy, x + dx];
      if (newImage.has(`${newY},${newX}`)) {
        continue;
      }
      const binaryCode = adjacentVectors
        .map(([newDy, newDx]) =>
          calculatePixelValue(image, newY + newDy, newX + newDx, i),
        )
        .join('');
      const code = parseInt(binaryCode, 2);
      newImage.set(
        `${newY},${newX}`,
        enhancementAlgorithm[code] === '#' ? 1 : 0,
      );
    }
  }

  return newImage;
}

function calculatePixelValue(
  image: Map<string, number>,
  y: number,
  x: number,
  i: number,
) {
  const defaultValue = i % 2 === 1 ? 1 : 0;
  return image.get(`${y},${x}`) ?? defaultValue;
  // const isEmpty = adjacentVectors.every(
  //   ([dy, dx]) => image.get(`${y + dy},${x + dx}`) !== 1,
  // );

  // if (i % 2 === 1 && isEmpty) {
  //   return 1;
  // }

  // return image.get(`${y},${x}`) ?? 0;
}

function part2(input: string[]) {
  let { image, enhancementAlgorithm } = parseImage(input);
  for (let i = 0; i < 50; i++) {
    image = enhanceImage({ image, enhancementAlgorithm }, i);
  }
  return [...image.values()].filter(x => x === 1).length;
}

runPuzzles(part1, part2, 2021, 20);
