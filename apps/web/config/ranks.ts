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
  Adamant: 0.01946598029,
  Rune: 0.03893585455,
  Dragon: 0.07398162823,
  Striker: 0.1168153516,
  Expert: 0.1674370247,
  Knight: 0.2297406223,
  Paladin: 0.3076201194,
  Legend: 0.3893935913,
  Natural: 0.4789550129,
  Sage: 0.6035622082,
  TzKal: 0.7787910766,
  Skulled: 0.9734898192,
  Beast: 1.20712831,
} as const satisfies Record<Exclude<StandardRank, 'Helper' | 'Steel'>, number>;
