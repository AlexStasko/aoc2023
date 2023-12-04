import { readFileSync } from "fs";
import path from "path";

export function readFile(): string[] {
  return readFileSync(path.join(__dirname, 'input.txt')).toString().trimEnd().split('\n');
}

export function compute(lines: string[]): number {
  let result = 0;

  for (const line of lines) {

    const sets = line.split(': ')[1].trim().replace(/  /g, ' ').split(' | ');
    const win = sets[0].split(' ');
    const my = sets[1].split(' ');
    let firstWin = true;
    let prize = 0;


    for (const num of my) {
      if (win.includes(num)) {
        if (firstWin) {
          prize = 1;
          firstWin = false;
        } else {
          prize *= 2;
        }
      }
    }

    if (prize != 0) {
      result += prize;
    }
  }

  return result;
}

export const INPUT = `\
Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11
`;

export const EXPECT = 13;

test('test', () => {
  expect(compute(INPUT.trimEnd().split('\n'))).toEqual(EXPECT);
});

test('task', () => {
  console.log('result: ', compute(readFile()));
});
