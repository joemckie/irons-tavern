import { z } from 'zod';
import { zfd } from 'zod-form-data';
import {
  CombatAchievementTier,
  DiaryLocation,
  DiaryTier,
  skillsCount,
} from '@/app/schemas/osrs';
import { PlayerName } from '@/app/schemas/player';
import { RankStructure } from '@/app/schemas/rank-calculator';
import { Rank } from '@/config/enums';

export const RankCalculatorSchema = zfd.formData({
  acquiredItems: z.record(
    z.union([zfd.checkbox({ trueValue: 'true' }), z.boolean().optional()]),
  ),
  achievementDiaries: z.record(DiaryLocation, DiaryTier),
  joinDate: z.coerce.date(),
  collectionLogCount: z.coerce.number().nonnegative(),
  collectionLogTotal: z.coerce.number().nonnegative(),
  combatAchievementTier: CombatAchievementTier,
  ehb: z.coerce.number().nonnegative(),
  ehp: z.coerce.number().nonnegative(),
  totalLevel: z.coerce.number().min(skillsCount),
  playerName: PlayerName,
  rankStructure: RankStructure,
  rank: Rank,
  points: z.coerce.number().nonnegative(),
  proofLink: z.union([z.string().url().nullish(), z.literal('')]),
  currentRank: Rank.optional(),
});

export type RankCalculatorSchema = z.infer<typeof RankCalculatorSchema>;
