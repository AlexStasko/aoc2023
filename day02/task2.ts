import { readFileSync } from "fs";
import path from "path";

export function readFile(): string[] {
  return readFileSync(path.join(__dirname, 'input.txt')).toString().trimEnd().split('\n');
}

export function compute(lines: string[]): number {
  let result = 0;

  result = lines
    .map(line => {
      const parts = line.split(':');
      const id = parts[0].match(/\d+/)![0];
      const parseSets = parts[1].split(';');
      const sets = parseSets.map(set => {
        let red = '0';
        let green = '0';
        let blue = '0';
        let match = set.match(/(\d+) red/);
        if (match != null) {
          red = match[1];
        }
        match = set.match(/(\d+) green/);
        if (match != null) {
          green = match[1];
        }
        match = set.match(/(\d+) blue/);
        if (match != null) {
          blue = match[1];
        }
        return {
          red: Number.parseInt(red),
          green: Number.parseInt(green),
          blue: Number.parseInt(blue),
        };
      });
      return {
        id: Number.parseInt(id),
        sets,
      }
    })
    .map(game => {
      let red: number | undefined = undefined;
      let blue: number | undefined = undefined;
      let green: number | undefined = undefined;
      game.sets.forEach(set => {
        red = !red || red < set.red ? set.red : red;
        blue = !blue || blue < set.blue? set.blue : blue;
        green = !green || green < set.green? set.green : green;
      });
      return red! * blue! * green!;
    })
    .reduce((a, b) => { return a + b }, result);

  return result;
}

export const INPUT = `\
Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green
`;

export const EXPECT = 2286;

test('test', () => {
  expect(compute(INPUT.trimEnd().split('\n'))).toEqual(EXPECT);
});

test('task', () => {
  console.log('result: ', compute(readFile()));
});
