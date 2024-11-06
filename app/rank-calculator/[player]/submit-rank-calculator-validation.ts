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

export const SubmitRankCalculatorSchema = zfd.formData({
  acquiredItems: z.record(z.boolean().optional()),
  achievementDiaries: z.record(DiaryLocation, DiaryTier),
  joinDate: z.date(),
  collectionLogCount: z.coerce.number().positive(),
  collectionLogTotal: z.coerce.number().positive(),
  combatAchievementTier: CombatAchievementTier,
  ehb: z.coerce.number().positive(),
  ehp: z.coerce.number().positive(),
  totalLevel: z.coerce.number().min(skillsCount),
  playerName: PlayerName,
  rankStructure: RankStructure,
  rank: z.string(),
  points: z.number().positive(),
});
