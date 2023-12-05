import { readFileSync } from "fs";
import path from "path";

type DestinationMap = { destinationStart: number, sourceStart: number, offset: number };
type SeedMap = { start: number, offset: number };

export function readFile(): string[] {
  return readFileSync(path.join(__dirname, 'input.txt')).toString().trimEnd().split('\n');
}

function findInMap(map: DestinationMap[], source: number): number {
  for (const item of map) {
    if (source >= item.sourceStart && source < item.sourceStart + item.offset) {
      return item.destinationStart + (source - item.sourceStart);
    }
  }
  return source;
}
export function compute(lines: string[]): number {
  let result = 0;

  const seeds = lines[0].split(': ')[1].split(' ');
  const seedMap: SeedMap[] = [];
  for (let i = 0; i < seeds.length; i += 2) {
    seedMap.push({
      start: Number.parseInt(seeds[i]),
      offset: Number.parseInt(seeds[i + 1]),
    });
  }

  const maps: DestinationMap[][] = [];
  let map: DestinationMap[] = [];
  for (let i = 2; i < lines.length; i++) {
    if (lines[i].includes(' map:')) continue;
    if (lines[i] === '' && map.length > 0) {
      maps.push(map);
      map = [];
      continue;
    }
    const mapping = lines[i].split(' ');
    map.push({
      destinationStart: Number.parseInt(mapping[0]),
      sourceStart: Number.parseInt(mapping[1]),
      offset: Number.parseInt(mapping[2]),
    });
  }

  if (map.length > 0) maps.push(map);

  let lowestLocation;
  for (let i = 0; i < seedMap.length; i++) {
    for (let j = seedMap[i].start; j < (seedMap[i].start + seedMap[i].offset); j++) {
      const soil = findInMap(maps[0], j);
      const fertilizer = findInMap(maps[1], soil);
      const water = findInMap(maps[2], fertilizer);
      const light = findInMap(maps[3], water);
      const temp = findInMap(maps[4], light);
      const humidity = findInMap(maps[5], temp);
      const location = findInMap(maps[6], humidity);
      if (!lowestLocation) {
        lowestLocation = location;
        continue;
      }
      if (location < lowestLocation!) {
        lowestLocation = location;
      }
    }
  }

  result = lowestLocation!;
  return result;
}

export const INPUT = `\
seeds: 79 14 55 13

seed-to-soil map:
50 98 2
52 50 48

soil-to-fertilizer map:
0 15 37
37 52 2
39 0 15

fertilizer-to-water map:
49 53 8
0 11 42
42 0 7
57 7 4

water-to-light map:
88 18 7
18 25 70

light-to-temperature map:
45 77 23
81 45 19
68 64 13

temperature-to-humidity map:
0 69 1
1 0 69

humidity-to-location map:
60 56 37
56 93 4
`;

export const EXPECT = 46;

test('test', () => {
  expect(compute(INPUT.trimEnd().split('\n'))).toEqual(EXPECT);
});

test('task', () => {
  console.log('result: ', compute(readFile()));
});
