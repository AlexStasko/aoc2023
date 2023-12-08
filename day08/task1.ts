import { readFileSync } from "fs";
import path from "path";

export function readFile(): string[] {
  return readFileSync(path.join(__dirname, 'input.txt')).toString().trimEnd().split('\n');
}

type Directions = {
  L: string;
  R: string;
}

export function compute(lines: string[]): number {
  let result = 0;

  const instruction = lines[0].split('') as Array<'R' | 'L'>;

  let map: Record<string, Directions> = {};
  for (let i = 2; i < lines.length; i++) {
    const [node, choise] = lines[i].split(' = ');
    const [L, R] = choise.replace(/\(|\)/g, '').split(', ');
    map[node] = {
      L,
      R,
    };
  }

  let location = 'AAA';
  let i = 0;
  while (location !== 'ZZZ') {

    if (i === instruction.length) {
      i = 0;
    }
    location = map[location][instruction[i]];
    i++;
    result++;

  }

  return result;
}

export const INPUT = `\
LLR

AAA = (BBB, BBB)
BBB = (AAA, ZZZ)
ZZZ = (ZZZ, ZZZ)
`;

export const EXPECT = 6;

test('test', () => {
  expect(compute(INPUT.trimEnd().split('\n'))).toEqual(EXPECT);
});

test('test2', () => {
const input = `\
RL

AAA = (BBB, CCC)
BBB = (DDD, EEE)
CCC = (ZZZ, GGG)
DDD = (DDD, DDD)
EEE = (EEE, EEE)
GGG = (GGG, GGG)
ZZZ = (ZZZ, ZZZ)
`;
const expected = 2;
expect(compute(input.trimEnd().split('\n'))).toEqual(expected);
});

test('task', () => {
  console.log('result: ', compute(readFile()));
});
