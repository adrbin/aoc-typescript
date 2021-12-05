import { runPuzzles } from '../../utils.js';

function part1(input: string[]) {
  const board = new Board();
  for (const line of input) {
    const [point1, point2] = line.split('->').map(x => x.trim());
    const [x1, y1] = point1.split(',').map(x => parseInt(x));
    const [x2, y2] = point2.split(',').map(x => parseInt(x));
    board.drawLine(x1, y1, x2, y2, false);
  }

  return [...board.board.values()].filter(x => x > 1).length;
}

class Board {
  board = new Map<string, number>();

  drawLine(
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    shouldconsiderDiagonals = true,
  ) {
    if (x1 === x2) {
      this.#drawVerticalLine(x1, y1, y2);
      return;
    }

    if (y1 === y2) {
      this.#drawHorizontalLine(x1, x2, y1);
      return;
    }

    if (!shouldconsiderDiagonals) {
      return;
    }

    if (Math.abs(x2 - x1) === Math.abs(y2 - y1)) {
      this.#drawDiagonalLine(x1, y1, x2, y2);
      return;
    }

    throw new Error(
      `Incorrect line type with x1 = ${x1}, y1 = ${y1}, x2 = ${x2}, y2 = ${y2}`,
    );
  }

  #drawVerticalLine(x: number, y1: number, y2: number) {
    if (y1 > y2) {
      [y1, y2] = [y2, y1];
    }
    for (let i = y1; i <= y2; i++) {
      const address = `${x},${i}`;
      let count = this.board.get(address) ?? 0;
      this.board.set(address, count + 1);
    }
  }

  #drawHorizontalLine(x1: number, x2: number, y: number) {
    if (x1 > x2) {
      [x1, x2] = [x2, x1];
    }
    for (let i = x1; i <= x2; i++) {
      const address = `${i},${y}`;
      let count = this.board.get(address) ?? 0;
      this.board.set(address, count + 1);
    }
  }

  #drawDiagonalLine(x1: number, y1: number, x2: number, y2: number) {
    if (x1 > x2) {
      [x1, y1, x2, y2] = [x2, y2, x1, y1];
    }

    const sign = y1 < y2 ? 1 : -1;

    for (let i = 0; i <= x2 - x1; i++) {
      const address = `${x1 + i},${y1 + i * sign}`;
      let count = this.board.get(address) ?? 0;
      this.board.set(address, count + 1);
    }
  }
}

function part2(input: string[]) {
  const board = new Board();
  for (const line of input) {
    const [point1, point2] = line.split('->').map(x => x.trim());
    const [x1, y1] = point1.split(',').map(x => parseInt(x));
    const [x2, y2] = point2.split(',').map(x => parseInt(x));
    board.drawLine(x1, y1, x2, y2, true);
  }

  return [...board.board.values()].filter(x => x > 1).length;
}

runPuzzles(part1, part2, 2021, 5);
