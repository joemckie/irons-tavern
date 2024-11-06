import { z } from 'zod';
import { zfd } from 'zod-form-data';
import {
  CombatAchievementTier,
  DiaryLocation,
  DiaryTier,
  skillsCount,
} from '@/types/osrs';
import { PlayerName } from '@/app/schemas/player';
import { RankStructure } from '@/types/rank-calculator';

export const RankCalculatorSchema = zfd.formData({
  acquiredItems: z.record(z.boolean().optional()),
  achievementDiaries: z.record(DiaryLocation, DiaryTier),
  joinDate: z.date(),
  collectionLogCount: z.coerce.number().nonnegative(),
  collectionLogTotal: z.coerce.number().nonnegative(),
  combatAchievementTier: CombatAchievementTier,
  ehb: z.coerce.number().nonnegative(),
  ehp: z.coerce.number().nonnegative(),
  totalLevel: z.coerce.number().min(skillsCount),
  playerName: PlayerName,
  rankStructure: RankStructure,
  rank: z.string(),
  points: z.number().nonnegative(),
});

export type RankCalculatorSchema = z.infer<typeof RankCalculatorSchema>;
