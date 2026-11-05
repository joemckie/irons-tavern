import { StandardRank } from '@/config/ranks';
import { calculateEffectiveCombatPoints } from './calculate-effective-combat-points';

it.each([
  ['Helper', 70000],
  ['Steel', 70000],
  ['Adamant', 70118.343],
  ['Rune', 70473.372],
  ['Dragon', 71065.088],
  ['Striker', 71893.491],
  ['Expert', 72958.579],
  ['Knight', 74260.355],
  ['Paladin', 75798.816],
  ['Legend', 77573.964],
  ['Natural', 79904.142],
  ['Sage', 83143.668],
  ['TzKal', 87355.029],
  ['Skulled', 92612.071],
  ['Beast', 99000],
] as const satisfies [StandardRank, number][])(
  'calculates %s to have %f effective combat points',
  (rank, expected) => {
    const effectiveCombatPoints = calculateEffectiveCombatPoints(rank);

    expect(effectiveCombatPoints).toBeCloseTo(expected);
  },
);
