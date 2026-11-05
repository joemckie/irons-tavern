import { StandardRank } from '@/config/ranks';
import { calculateEffectiveSkillingPoints } from './calculate-effective-skilling-points';

it.each([
  ['Helper', 70000],
  ['Steel', 70000],
  ['Adamant', 70118.3432],
  ['Rune', 70473.37278],
  ['Dragon', 71065.08876],
  ['Striker', 71893.49112],
  ['Expert', 72958.57988],
  ['Knight', 74492.41864],
  ['Paladin', 76746.30178],
  ['Legend', 79755.73225],
  ['Natural', 83565.08876],
  ['Sage', 88227.62574],
  ['TzKal', 93805.47337],
  ['Skulled', 100369.6376],
  ['Beast', 108000],
] as const satisfies [StandardRank, number][])(
  'calculates %s to have %f effective skilling points',
  (rank, expected) => {
    const effectiveSkillingPoints = calculateEffectiveSkillingPoints(rank);

    expect(effectiveSkillingPoints).toBeCloseTo(expected);
  },
);
