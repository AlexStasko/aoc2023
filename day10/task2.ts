import { readFileSync } from "fs";
import path from "path";

export function readFile(): string[] {
  return readFileSync(path.join(__dirname, 'input.txt')).toString().trimEnd().split('\n');
}

export function compute(lines: string[]): number {
  let result = 0;

  const map: Array<Array<'S' | '.' | 'F' | '7' | 'J' | 'L' | '-' | '|' | '0'>> = lines.map(a => {
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
  let first;
  let second;

  if (startY != 0 && ['|', '7', 'F'].includes(map[startY - 1][startX])) {
    currentX = startX;
    currentY = startY - 1;
    first = 'N';
  }
  if (startX + 1 != map[0].length && ['-', '7', 'J'].includes(map[startY][startX + 1])) {
    currentX = startX + 1;
    currentY = startY;
    if (!first) {
      first = 'W';
    } else {
      second = 'W';
    }
  }
  if (startY + 1 != map.length && ['|', 'J', 'L'].includes(map[startY + 1][startX])) {
    currentX = startX;
    currentY = startY + 1;
    if (!first) {
      first = 'S';
    } else {
      second = 'S';
    }
  }
  if (startX != 0 && ['-', 'L', 'F'].includes(map[startY][startX - 1])) {
    currentX = startX - 1;
    currentY = startY;
    if (!first) {
      first = 'E';
    } else {
      second = 'E';
    }
  }
  switch(first! + second!) {
    case 'NW':
      map[startY][startX] = 'L';
      break;
    case 'NS':
      map[startY][startX] = '|';
      break;
    case 'NE':
      map[startY][startX] = 'J';
      break;
    case 'WE':
      map[startY][startX] = '-';
      break;
    case 'WS':
      map[startY][startX] = 'F';
      break;
    case 'SE':
      map[startY][startX] = '7';
      break;
  }

  let steps = 1;

  let previousX = startX;
  let previousY = startY;
  let nodes = [{ x: startX, y: startY }];
  while (!(currentX === startX && currentY === startY)) {
    nodes.push({ x: currentX, y: currentY });
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

  for (let y = 0; y < map.length; y++) {
    let verticals = 0;
    for (let x = 0; x < map[y].length; x++) {
      let found = false;
      for (const node of nodes) {
        if (node.x === x && node.y === y) {
          found = true;
          if (['J', 'L', '|'].includes(map[y][x])) {
            verticals++;
          }
          break;
        }
      }
      if (!found) {
        map[y][x] = '.';
        if (verticals != 0 && verticals % 2 != 0) {
          map[y][x] = '0';
          result++;
        }
      }
    }
  }
  
  // uncomment to print result map
  //const resultMap = map.reduce((a, b) => [a, b.join('')].join('\n'), '');
  //console.log(resultMap);


  return result;
}

export const INPUT = `\
...........
.S-------7.
.|F-----7|.
.||.....||.
.||.....||.
.|L-7.F-J|.
.|..|.|..|.
.L--J.L--J.
...........
`;

export const EXPECT = 4;

test('test', () => {
  expect(compute(INPUT.trimEnd().split('\n'))).toEqual(EXPECT);
});

export const INPUT_2 = `\
.F----7F7F7F7F-7....
.|F--7||||||||FJ....
.||.FJ||||||||L7....
FJL7L7LJLJ||LJ.L-7..
L--J.L7...LJS7F-7L7.
....F-J..F7FJ|L7L7L7
....L7.F7||L7|.L7L7|
.....|FJLJ|FJ|F7|.LJ
....FJL-7.||.||||...
....L---J.LJ.LJLJ...
`;

export const EXPECT_2 = 8;

test('test2', () => {
  expect(compute(INPUT_2.trimEnd().split('\n'))).toEqual(EXPECT_2);
});

export const INPUT_3 = `\
FF7FSF7F7F7F7F7F---7
L|LJ||||||||||||F--J
FL-7LJLJ||||||LJL-77
F--JF--7||LJLJ7F7FJ-
L---JF-JLJ.||-FJLJJ7
|F|F-JF---7F7-L7L|7|
|FFJF7L7F-JF7|JL---7
7-L-JL7||F7|L7F-7F7|
L.L7LFJ|||||FJL7||LJ
L7JLJL-JLJLJL--JLJ.L
`;

export const EXPECT_3 = 10;

test('test3', () => {
  expect(compute(INPUT_3.trimEnd().split('\n'))).toEqual(EXPECT_3);
});

test('task', () => {
  console.log('result: ', compute(readFile()));
});
