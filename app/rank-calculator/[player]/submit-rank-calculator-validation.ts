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

export const RankCalculatorSchema = zfd.formData({
  acquiredItems: z.record(
    z.union([zfd.checkbox({ trueValue: 'true' }), z.boolean().optional()]),
  ),
  achievementDiaries: z.record(DiaryLocation, DiaryTier),
  joinDate: z.date(),
  collectionLogCount: z.number().nonnegative(),
  collectionLogTotal: z.number().nonnegative(),
  combatAchievementTier: CombatAchievementTier,
  ehb: z.number().nonnegative(),
  ehp: z.number().nonnegative(),
  totalLevel: z.number().min(skillsCount),
  playerName: PlayerName,
  rankStructure: RankStructure,
  rank: z.string(),
  points: z.number().nonnegative(),
  proofLink: z.union([z.string().url().nullish(), z.literal('')]),
});

export type RankCalculatorSchema = z.infer<typeof RankCalculatorSchema>;
