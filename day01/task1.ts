import { readFileSync } from "fs";
import path from "path";

export function readFile(): string[] {
  return readFileSync(path.join(__dirname, 'input.txt')).toString().trimEnd().split('\n');
}

const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];

function findEntries(str: string): { firstEntry: string, secondEntry: string } {
  let firstEntry = undefined;
  let secondEntry = undefined;

  for (const char of str) {
    if (numbers.includes(char)) {
      if (!firstEntry) {
        firstEntry = char;
        secondEntry = char;
      }
      secondEntry = char;
    }
  }

  if (!firstEntry) {
    throw new Error();
  }
  if (!secondEntry) {
    throw new Error();
  }

  return {
    firstEntry,
    secondEntry,
  }
}

function produceValue(first: string, second: string): number {
  return Number.parseInt(first + second);
}

export function main(input: string[]): number {
  return input.map(findEntries).map(entry => {
    return produceValue(entry.firstEntry, entry.secondEntry);
  }).reduce((a, b) => {
    return a + b;
  }, 0);
}
export function compute(lines: string[]): number {
  let result = 0;

  result = lines.map(findEntries).map(entry => {
    return produceValue(entry.firstEntry, entry.secondEntry);
  }).reduce((a, b) => { return a + b }, result);

  return result;
}

export const INPUT = `\
1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet
`;

export const EXPECT = 142;

test('test', () => {
  expect(compute(INPUT.trimEnd().split('\n'))).toEqual(EXPECT);
});

test('task', () => {
  console.log('result: ', compute(readFile()));
});

