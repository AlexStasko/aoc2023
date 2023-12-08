import { readFileSync } from "fs";
import path from "path";

export function readFile(): string[] {
  return readFileSync(path.join(__dirname, 'input.txt')).toString().trimEnd().split('\n');
}

type Directions = {
  L: string;
  R: string;
}

function gcd(a: number, b: number): number {
  while (b > 0) {
    const c = a % b;
    a = b;
    b = c;
  }
  return a;
}

function lcm(a: number, b: number): number {
  return (a * b) / gcd(a, b);
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

  let locations = Object.keys(map).filter(a => a.endsWith('A'));

  const lengths = locations.map(loc => {
    let i = 0;
    let steps = 0;
    while (!loc.endsWith('Z')) {
      if (i === instruction.length) {
        i = 0;
      }
      loc = map[loc][instruction[i]];
      i++;
      steps++;
    }
    return steps;
  });

  result = lengths.reduce((a, b) => lcm(a, b), 1);

  return result;
}

export const INPUT = `\
LR

11A = (11B, XXX)
11B = (XXX, 11Z)
11Z = (11B, XXX)
22A = (22B, XXX)
22B = (22C, 22C)
22C = (22Z, 22Z)
22Z = (22B, 22B)
XXX = (XXX, XXX)
`;

export const EXPECT = 6;

test('test', () => {
  expect(compute(INPUT.trimEnd().split('\n'))).toEqual(EXPECT);
});

test('task', () => {
  console.log('result: ', compute(readFile()));
});
