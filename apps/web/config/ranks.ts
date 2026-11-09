import { z } from 'zod';
import { Rank } from './enums';

export const rankNames: Partial<Record<Rank, string>> = {
  General: 'Major',
  Admiral: 'General',
  Marshal: 'Field Marshal',
};

export const StandardRank = Rank.extract([
  'Helper',
  'Steel',
  'Adamant',
  'Rune',
  'Dragon',
  'Striker',
  'Expert',
  'Knight',
  'Paladin',
  'Legend',
  'Natural',
  'Sage',
  'TzKal',
  'Skulled',
  'Beast',
]);

export type StandardRank = z.infer<typeof StandardRank>;

export const standardRankIndices = Object.fromEntries(
  StandardRank.options.map((rank, index) => [rank, index + 1]),
) as Record<StandardRank, number>;

/**
 * The rank factors are used to calculate the rank thresholds as a percentage of the total points.
 */
export const rankFactors = {
  Adamant: 0.01,
  Rune: 0.04,
  Dragon: 0.0775,
  Striker: 0.1275,
  Expert: 0.1875,
  Knight: 0.2575,
  Paladin: 0.333,
  Legend: 0.41,
  Natural: 0.49,
  Sage: 0.57,
  TzKal: 0.6675,
  Skulled: 0.7775,
  Beast: 0.9125,
} as const satisfies Record<Exclude<StandardRank, 'Helper' | 'Steel'>, number>;
