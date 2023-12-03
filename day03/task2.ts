import { readFileSync } from "fs";
import path from "path";

export function readFile(): string[] {
  return readFileSync(path.join(__dirname, 'input.txt')).toString().trimEnd().split('\n');
}

export function compute(lines: string[]): number {
  let result = 0;
  let list = [];

  for (let i = 0; i < lines.length; i++) {
    let number = '';
    for (let j = 0; j < lines[i].length; j++) {
      if (j + 1 == lines[i].length || lines[i][j].match(/\D/)) {
        if (lines[i][j].match(/\d/)) number += lines[i][j];
        if (number) {
          let position = j - (lines[i][j].match(/\d/) && j + 1 == lines[i].length ? number.length - 1 : number.length);
          let firstIndex = position == 0 ? position : position - 1;
          let lastIndex = j + 1 == lines[i].length ? j : j + 1;
          let reg = /\*/;
          for (let k = firstIndex; k < lastIndex; k++) {
            if (i != 0) {
              if (reg.test(lines[i - 1][k])) {
                list.push({
                  number,
                  line: i - 1,
                  position: k,
                  calculated: false,
                });
                break;
              }
            }
            if (i != lines.length - 1) {
              if (reg.test(lines[i + 1][k])) {
                list.push({
                  number,
                  line: i + 1,
                  position: k,
                  calculated: false,
                });
                break;
              }
            }
            if (reg.test(lines[i][k])) {
              list.push({
                number,
                line: i,
                position: k,
                calculated: false,
              });
              break;
            }
          }
          number = '';
        }
      } else {
        number += lines[i][j];
      }
    }
  }

  for (let i = 0; i < list.length; i++) {
    if (list[i].calculated) continue;
    for (let j = 0; j < list.length; j++) {
      if (i == j) continue;
      if (list[i].position == list[j].position && list[i].line == list[j].line && !list[j].calculated) {
        list[i].calculated = true;
        result += Number.parseInt(list[i].number) * Number.parseInt(list[j].number);
        break;
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
`;

export const EXPECT = 467835;

test('test', () => {
  expect(compute(INPUT.trimEnd().split('\n'))).toEqual(EXPECT);
});

test('task', () => {
  console.log('result: ', compute(readFile()));
});
