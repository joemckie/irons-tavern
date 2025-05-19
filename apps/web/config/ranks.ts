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

/**
 * The rank proportions are used to calculate the rank thresholds as a percentage of the total points.
 */
export const rankProportions = {
  Adamant: 0.0195,
  Rune: 0.039,
  Dragon: 0.074,
  Striker: 0.117,
  Expert: 0.1677,
  Knight: 0.23,
  Paladin: 0.308,
  Legend: 0.39,
  Natural: 0.47978,
  Sage: 0.6046,
  TzKal: 0.78,
  Skulled: 0.975,
  Beast: 1.2092,
} as const satisfies Record<Exclude<StandardRank, 'Helper' | 'Steel'>, number>;
