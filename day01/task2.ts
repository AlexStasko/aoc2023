import { readFileSync } from "fs";
import path from "path";

export function readFile(): string[] {
  return readFileSync(path.join(__dirname, 'input.txt')).toString().trimEnd().split('\n');
}

enum words {
  one = '1',
  two = '2',
  three = '3',
  four = '4',
  five = '5',
  six = '6',
  seven = '7',
  eight = '8',
  nine = '9',
}

function findEntries(str: string): { firstEntry: string, secondEntry: string } {
  const reg = new RegExp('\\d|' + Object.keys(words).join('|'), 'g');
  const reg_rev = new RegExp('\\d|' + Object.keys(words).map(word => word.split('').reverse().join('')).join('|'), 'g');
  let firstEntry = str.match(reg)![0];
  let secondEntry = str.split('').reverse().join('').match(reg_rev)![0].split('').reverse().join('');

  if (Object.keys(words).includes(firstEntry)) {
    firstEntry = words[firstEntry as keyof typeof words];
  }
  if (Object.keys(words).includes(secondEntry)) {
    secondEntry = words[secondEntry as keyof typeof words];
  }

  return {
    firstEntry,
    secondEntry,
  }
}

function produceValue(first: string, second: string): number {
  return Number.parseInt(first + second);
}

function compute(lines: string[]): number {
  let result = 0;

  result = lines.map(findEntries).map(entry => {
    return produceValue(entry.firstEntry, entry.secondEntry);
  }).reduce((a, b) => { return a + b }, result);

  return result;
}

const INPUT = `\
two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen
`;

const EXPECT = 281;

test('test', () => {
  expect(compute(INPUT.trimEnd().split('\n'))).toEqual(EXPECT);
});

test('task', () => {
  console.log('result: ', compute(readFile()));
});

