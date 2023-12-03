import { readFileSync } from "fs";
import path from "path";

export function readFile(): string[] {
  return readFileSync(path.join(__dirname, 'input.txt')).toString().trimEnd().split('\n');
}

export function compute(lines: string[]): number {
  let result = 0;

  for (let i = 0; i < lines.length; i++) {
    let number = '';
    for (let j = 0; j < lines[i].length; j++) {
      if (j + 1 == lines[i].length || lines[i][j].match(/\D/)) {
        if (lines[i][j].match(/\d/)) number += lines[i][j];
        if (number) {
          let position = j - (lines[i][j].match(/\d/) && j + 1 == lines[i].length ? number.length - 1 : number.length);
          let isPart = false;
          let firstIndex = position == 0 ? position : position - 1;
          let lastIndex = j + 1 == lines[i].length ? j : j + 1;
          let reg = /[^\d\.]/;
          if (i != 0 && i != lines.length - 1) {
            for (let k = firstIndex; k < lastIndex; k++) {
              if (reg.test(lines[i - 1][k]) || reg.test(lines[i][k]) || reg.test(lines[i + 1][k])) {
                isPart = true;
                break;
              }
            }
          }
          if (i == 0) {
            for (let k = firstIndex; k < lastIndex; k++) {
              if (reg.test(lines[i][k]) || reg.test(lines[i + 1][k])) {
                isPart = true;
                break;
              }
            }
          }
          if (i == lines.length - 1) {
            for (let k = firstIndex; k < lastIndex; k++) {
              if (reg.test(lines[i - 1][k]) || reg.test(lines[i][k])) {
                isPart = true;
                break;
              }
            }
          }

          //console.log({ number, isPart, position, line: i });
          if (isPart) {
            result += Number.parseInt(number);
          }
          number = '';
        }
      } else {
        number += lines[i][j];
      }
    }
  }

  return result;
}

export const INPUT = `\
467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..
..........
........*1
.1*1......
`;

export const EXPECT = 4364;

test('test', () => {
  expect(compute(INPUT.trimEnd().split('\n'))).toEqual(EXPECT);
});

test('task', () => {
  console.log('result: ', compute(readFile()));
});
