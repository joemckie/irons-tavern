import { z } from 'zod';
import { Rank } from './enums';
import type { RankStructure } from '@/app/schemas/rank-calculator';

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

export const StaffRank = Rank.extract([
  'Owner',
  'Deputy Owner',
  'Moderator',
  'Marshal',
  'Admiral',
  'Brigadier',
  'Colonel',
  'General',
  'Captain',
]);

export type StaffRank = z.infer<typeof StaffRank>;

export const AdminRank = StaffRank.exclude([
  'Deputy Owner',
  'Moderator',
  'Owner',
]);

export type AdminRank = z.infer<typeof AdminRank>;

export const rankStructureTiers = {
  Owner: 4,
  'Deputy Owner': 3,
  Moderator: 2,
  Admin: 1,
  Legacy: 0,
  Standard: 0,
} as const satisfies Record<RankStructure, number>;

export const staffRankTypes = {
  Owner: 'Owner',
  'Deputy Owner': 'Deputy Owner',
  Moderator: 'Moderator',
  Marshal: 'Admin',
  Admiral: 'Admin',
  Brigadier: 'Admin',
  Colonel: 'Admin',
  General: 'Admin',
  Captain: 'Admin',
} as const satisfies Record<StaffRank, RankStructure>;

/**
 * The rank proportions are used to calculate the rank thresholds as a percentage of the total points.
 */
export const rankProportions = {
  Adamant: 0.01932929399,
  Rune: 0.03866245462,
  Dragon: 0.07346214374,
  Striker: 0.11599509711,
  Expert: 0.16626131473,
  Knight: 0.22812742873,
  Paladin: 0.305462,
  Legend: 0.38665934584,
  Natural: 0.47559188471,
  Sage: 0.5993241127,
  TzKal: 0.77332255832,
  Skulled: 0.96665416456,
  Beast: 1.198651,
} as const satisfies Record<Exclude<StandardRank, 'Helper' | 'Steel'>, number>;
