import { StandardRank } from '@/config/ranks';
import { calculateEffectiveCollectionLogPoints } from './calculate-effective-collection-log-points';

it.each([
  ['Helper', 79560],
  ['Steel', 79560],
  ['Adamant', 79560],
  ['Rune', 79560],
  ['Dragon', 79560],
  ['Striker', 79560],
  ['Expert', 79560],
  ['Knight', 79808.625],
  ['Paladin', 80554.5],
  ['Legend', 81797.625],
  ['Natural', 83538],
  ['Sage', 85775.625],
  ['TzKal', 88510.5],
  ['Skulled', 91742.625],
  ['Beast', 95472],
] as const satisfies [StandardRank, number][])(
  'calculates %s to have %f effective collection log points',
  (rank, expected) => {
    const effectiveSkillingPoints = calculateEffectiveCollectionLogPoints(
      1734,
      rank,
    );

    expect(effectiveSkillingPoints).toBeCloseTo(expected);
  },
);
