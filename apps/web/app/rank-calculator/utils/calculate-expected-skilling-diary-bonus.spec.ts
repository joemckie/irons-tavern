import { calculateExpectedSkillingDiaryBonus } from './calculate-expected-skilling-diary-bonus';
import type { StandardRank } from '@/config/ranks';

it.each([
  ['Helper', 1],
  ['Steel', 1],
  ['Adamant', 1],
  ['Rune', 1],
  ['Dragon', 1],
  ['Striker', 1],
  ['Expert', 1],
  ['Knight', 1.003125],
  ['Paladin', 1.0125],
  ['Legend', 1.028125],
  ['Natural', 1.05],
  ['Sage', 1.078125],
  ['TzKal', 1.1125],
  ['Skulled', 1.153125],
  ['Beast', 1.2],
] as const satisfies readonly [StandardRank, number][])(
  'calculates %s = %f',
  (rank, expected) => {
    expect(calculateExpectedSkillingDiaryBonus(rank)).toBe(expected);
  },
);
