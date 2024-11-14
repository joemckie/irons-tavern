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
  collectionLogCount: z.number().nonnegative(),
  collectionLogTotal: z.number().nonnegative(),
  combatAchievementTier: CombatAchievementTier,
  ehb: z.number().nonnegative(),
  ehp: z.number().nonnegative(),
  totalLevel: z.number().min(skillsCount),
  playerName: PlayerName,
  rankStructure: RankStructure,
  rank: Rank,
  points: z.number().nonnegative(),
  proofLink: z.union([z.string().url().nullish(), z.literal('')]),
});

export type RankCalculatorSchema = z.infer<typeof RankCalculatorSchema>;
