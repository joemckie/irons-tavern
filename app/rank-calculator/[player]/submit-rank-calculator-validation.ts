import { z } from 'zod';
import {
  CombatAchievementTier,
  DiaryLocation,
  DiaryTier,
  maximumTotalLevel,
  minimumTotalLevel,
  TzHaarCape,
} from '@/app/schemas/osrs';
import { PlayerName } from '@/app/schemas/player';
import { RankStructure } from '@/app/schemas/rank-calculator';
import { Rank } from '@/config/enums';
import { pickBy } from 'lodash';

export const RankCalculatorSchema = z.object({
  acquiredItems: z
    .record(z.boolean().optional())
    .transform((data) => pickBy(data, (val) => val)),
  achievementDiaries: z.record(DiaryLocation, DiaryTier),
  joinDate: z.coerce.date(),
  collectionLogCount: z.coerce.number().nonnegative(),
  collectionLogTotal: z.coerce.number().nonnegative(),
  combatAchievementTier: CombatAchievementTier,
  ehb: z.coerce.number().nonnegative(),
  ehp: z.coerce.number().nonnegative(),
  totalLevel: z.coerce.number().min(minimumTotalLevel).max(maximumTotalLevel),
  playerName: PlayerName,
  rankStructure: RankStructure,
  rank: Rank,
  points: z.coerce.number().nonnegative(),
  proofLink: z.union([z.string().url().nullish(), z.literal('')]),
  tzhaarCape: TzHaarCape,
  hasBloodTorva: z.boolean().optional(),
  hasDizanasQuiver: z.boolean().optional(),
  hasMaxCape: z.boolean().optional(),
  hasAchievementDiaryCape: z.boolean().optional(),
});

export type RankCalculatorSchema = z.infer<typeof RankCalculatorSchema>;
