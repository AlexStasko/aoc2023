import { readFileSync } from "fs";
import path from "path";

export function readFile(): string[] {
  return readFileSync(path.join(__dirname, 'input.txt')).toString().trimEnd().split('\n');
}

export function compute(lines: string[]): number {
  let result = 0;

  result = lines.map(line => {
    return line.split(' ').map(a => Number.parseInt(a));
  })
    .map(seq => {
      let current = seq;
      let extra: Array<Array<number>> = [];
      let index = 0;
      while (!current.every(a => a === 0)) {
        for (let i = 0; i < current.length - 1; i++) {
          if (!extra[index]) extra[index] = [];
          extra[index].push(current[i + 1] - current[i]);
        }
        current = extra[index];
        index++;
      }

      for (let i = extra.length - 2; i >= 0; i--) {
        extra[i].splice(0, 0, extra[i][0] - extra[i + 1][0]);
      }

      return seq[0] - extra[0][0];
    })
    .reduce((a, b) => { return a + b }, result);

  return result;
}

export const INPUT = `\
0 3 6 9 12 15
1 3 6 10 15 21
10 13 16 21 30 45
`;

export const EXPECT = 2;

test('test', () => {
  expect(compute(INPUT.trimEnd().split('\n'))).toEqual(EXPECT);
});

test('task', () => {
  console.log('result: ', compute(readFile()));
});
