import { readFileSync } from "fs";
import path from "path";

export function readFile(): string[] {
  return readFileSync(path.join(__dirname, 'input.txt')).toString().trimEnd().split('\n');
}

export function compute(lines: string[]): number {
  let result = 0;
  const time = Number.parseInt(lines[0].split(':')[1].trim().split(/\s+/).join(''));
  const distance = Number.parseInt(lines[1].split(':')[1].trim().split(/\s+/).join(''));

  for (let j = 1; j < time; j++) {
    const remain = time - j;
    const myDistance = remain * j;
    if (myDistance > distance) {
      result++;
    }
  }

  return result;
}

export const INPUT = `\
Time:      7  15   30
Distance:  9  40  200
`;

export const EXPECT = 71503;

test('test', () => {
  expect(compute(INPUT.trimEnd().split('\n'))).toEqual(EXPECT);
});

test('task', () => {
  console.log('result: ', compute(readFile()));
});
