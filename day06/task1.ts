import { readFileSync } from "fs";
import path from "path";

export function readFile(): string[] {
  return readFileSync(path.join(__dirname, 'input.txt')).toString().trimEnd().split('\n');
}

export function compute(lines: string[]): number {
  let result = 1;
  const times = lines[0].split(':')[1].trim().split(/\s+/).map(time => Number.parseInt(time));
  const distances = lines[1].split(':')[1].trim().split(/\s+/).map(distance => Number.parseInt(distance));

  for (let i = 0; i < times.length; i++) {
    let wins = 0;
    for (let j = 1; j < times[i]; j++) {
      const remain = times[i] - j;
      const myDistance = remain * j;
      if (myDistance > distances[i]) {
        wins++;
      }
    }
    result *= wins;
  }

  return result;
}

export const INPUT = `\
Time:      7  15   30
Distance:  9  40  200
`;

export const EXPECT = 288;

test('test', () => {
  expect(compute(INPUT.trimEnd().split('\n'))).toEqual(EXPECT);
});

test('task', () => {
  console.log('result: ', compute(readFile()));
});
