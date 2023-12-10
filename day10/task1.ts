import { readFileSync } from "fs";
import path from "path";

export function readFile(): string[] {
  return readFileSync(path.join(__dirname, 'input.txt')).toString().trimEnd().split('\n');
}

export function compute(lines: string[]): number {
  let result = 0;

  const map: Array<Array<'S' | '.' | 'F' | '7' | 'J' | 'L' | '-' | '|'>> = lines.map(a => {
    return a.split('') as Array<'S' | '.' | 'F' | '7' | 'J' | 'L' | '-' | '|'>;
  });

  let startX = 0;
  let startY = 0;
  for (let i = 0; i < map.length; i++) {
    startX = map[i].findIndex(a => (a === 'S'));
    if (startX != -1) {
      startY = i;
      break;
    }
  }

  let currentX = 0;
  let currentY = 0;

  if (['|', '7', 'F'].includes(map[startY - 1][startX])) {
    currentX = startX;
    currentY = startY - 1;
  }
  if (['-', '7', 'J'].includes(map[startY][startX + 1])) {
    currentX = startX + 1;
    currentY = startY;
  }
  if (['|', 'J', 'L'].includes(map[startY + 1][startX])) {
    currentX = startX;
    currentY = startY + 1;
  }
  if (['-', 'L', 'F'].includes(map[startY][startX - 1])) {
    currentX = startX - 1;
    currentY = startY;
  }

  let steps = 1;

  let previousX = startX;
  let previousY = startY;
  while (!(currentX === startX && currentY === startY)) {
    let nextX = 0;
    let nextY = 0;
    switch (map[currentY][currentX]) {
      case "S":
        break;
      case ".":
        throw new Error("we're lost");
      case "F":
        if (currentX - previousX === 0) {
          nextX = currentX + 1;
          nextY = currentY;
        } else {
          nextX = currentX;
          nextY = currentY + 1;
        }
        break;
      case "7":
        if (currentX - previousX === 0) {
          nextX = currentX - 1;
          nextY = currentY;
        } else {
          nextX = currentX;
          nextY = currentY + 1;
        }
        break;
      case "J":
        if (currentX - previousX === 0) {
          nextX = currentX - 1;
          nextY = currentY;
        } else {
          nextX = currentX;
          nextY = currentY - 1;
        }
        break;
      case "L":
        if (currentX - previousX === 0) {
          nextX = currentX + 1;
          nextY = currentY;
        } else {
          nextX = currentX;
          nextY = currentY - 1;
        }
        break;
      case "-":
        nextX = currentX + currentX - previousX;
        nextY = currentY;
        break;
      case "|":
        nextX = currentX;
        nextY = currentY + currentY - previousY;
        break;
    }

    previousX = currentX;
    previousY = currentY;
    currentX = nextX;
    currentY = nextY;
    steps++;
  }

  result = steps / 2;

  return result;
}

export const INPUT = `\
..F7.
.FJ|.
SJ.L7
|F--J
LJ...
`;

export const EXPECT = 8;

test('test', () => {
  expect(compute(INPUT.trimEnd().split('\n'))).toEqual(EXPECT);
});
export const INPUT_2 = `\
.....
.S-7.
.|.|.
.L-J.
.....
`;

export const EXPECT_2 = 4;

test('test2', () => {
  expect(compute(INPUT_2.trimEnd().split('\n'))).toEqual(EXPECT_2);
});

test('task', () => {
  console.log('result: ', compute(readFile()));
});
