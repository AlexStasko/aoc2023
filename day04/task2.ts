import { readFileSync } from "fs";
import path from "path";

export function readFile(): string[] {
  return readFileSync(path.join(__dirname, 'input.txt')).toString().trimEnd().split('\n');
}

function process(arr: {line: string, copies: number}[], index: number, result: number): number {
  if (index == arr.length) return result;
  const line = arr[index].line;
  const sets = line.split(': ')[1].trim().replace(/  /g, ' ').split(' | ');
  let prize = 0;

  for (const num of sets[1].split(' ')) {
    if (sets[0].split(' ').includes(num)) {
      prize++;
    }
  }

  const copies = arr[index].copies;
  if (prize != 0) {
    for (let i = 1; i <= prize; i++) {
      arr[index + i].copies += copies;
    }
  }

  return process(arr, index + 1, result + copies);
}
export function compute(lines: string[]): number {

  const arr = lines.map(line => ({line, copies: 1}));

  return process(arr, 0, 0);
}

export const INPUT = `\
Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11
`;

export const EXPECT = 30;

test('test', () => {
  expect(compute(INPUT.trimEnd().split('\n'))).toEqual(EXPECT);
});

test('task', () => {
  console.log('result: ', compute(readFile()));
});
