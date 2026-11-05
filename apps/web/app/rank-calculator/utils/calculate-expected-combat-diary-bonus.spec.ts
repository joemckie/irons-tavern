import { calculateExpectedCombatDiaryBonus } from './calculate-expected-combat-diary-bonus';
import type { StandardRank } from '@/config/ranks';

it.each([
  ['Helper', 1],
  ['Steel', 1],
  ['Adamant', 1],
  ['Rune', 1],
  ['Dragon', 1],
  ['Striker', 1],
  ['Expert', 1],
  ['Knight', 1],
  ['Paladin', 1],
  ['Legend', 1],
  ['Natural', 1.004],
  ['Sage', 1.016],
  ['TzKal', 1.036],
  ['Skulled', 1.064],
  ['Beast', 1.1],
] as const satisfies readonly [StandardRank, number][])(
  'calculates %s = %f',
  (rank, expected) => {
    expect(calculateExpectedCombatDiaryBonus(rank)).toBe(expected);
  },
);
