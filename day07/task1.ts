import { readFileSync } from "fs";
import path from "path";

export function readFile(): string[] {
  return readFileSync(path.join(__dirname, 'input.txt')).toString().trimEnd().split('\n');
}

type Rank = { card: string, number: number };

function parseCard(card: string): number {
  switch (card) {
    case '2':
      return 1;
    case '3':
      return 2;
    case '4':
      return 3;
    case '5':
      return 4;
    case '6':
      return 5;
    case '7':
      return 6;
    case '8':
      return 7;
    case '9':
      return 8;
    case 'T':
      return 9;
    case 'J':
      return 10;
    case 'Q':
      return 11;
    case 'K':
      return 12;
    case 'A':
      return 13;
    default:
      return 0;
  }
}

function getRank(hand: string): number {
  const cards: Rank[] = [];
  for (const card of hand) {
    let isCopy = false;
    for (const entry of cards) {
      if (entry.card === card) {
        entry.number += 1;
        isCopy = true;
      }
    }
    if (!isCopy) {
      cards.push({
        card,
        number: 1,
      });
    }
  }
  switch (cards.length) {
    case 1:
      return 7;
    case 2:
      if (cards.find(a => a.number === 4)) {
        return 6;
      }
      return 5;
    case 3:
      if (cards.find(a => a.number === 3)) {
        return 4;
      }
      return 3;
    case 4:
      return 2;
    case 5:
      return 1;
    default:
      return 0;
  }
}
export function compute(lines: string[]): number {
  let result = 0;

  const bids = lines.map(line => {
    const parts = line.split(' ');
    return {
      hand: parts[0],
      bid: Number.parseInt(parts[1]),
    };
  })
  .sort((a, b) => {
    let diff = getRank(a.hand) - getRank(b.hand);
    if (diff === 0) {
      for (let i = 0; i < a.hand.length; i++) {
        let anotherDiff = parseCard(a.hand[i]) - parseCard(b.hand[i]);
        if (anotherDiff !== 0) {
          diff = anotherDiff;
          break;
        }
      }
    }
    return diff;
  });

  for (let i = 0; i < bids.length; i++) {
    result += bids[i].bid * (i + 1);
  }

  return result;
}

export const INPUT = `\
32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483
`;

export const EXPECT = 6440;

test('test', () => {
  expect(compute(INPUT.trimEnd().split('\n'))).toEqual(EXPECT);
});

test('task', () => {
  console.log('result: ', compute(readFile()));
});
