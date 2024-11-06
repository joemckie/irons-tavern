import { z } from 'zod';
import { zfd } from 'zod-form-data';
import {
  combatAchievementTierSchema,
  diaryLocationSchema,
  diaryTierSchema,
  skillsCount,
} from '@/types/osrs';
import { playerNameSchema } from '@/app/schemas/player';
import { rankStructureSchema } from '@/types/rank-calculator';

export const submitRankCalculatorSchema = zfd.formData({
  acquiredItems: z.record(z.boolean().optional()),
  achievementDiaries: z.record(diaryLocationSchema, diaryTierSchema),
  joinDate: z.date(),
  collectionLogCount: z.coerce.number().positive(),
  collectionLogTotal: z.coerce.number().positive(),
  combatAchievementTier: combatAchievementTierSchema,
  ehb: z.coerce.number().positive(),
  ehp: z.coerce.number().positive(),
  totalLevel: z.coerce.number().min(skillsCount),
  playerName: playerNameSchema,
  rankStructure: rankStructureSchema,
  rank: z.string(),
  points: z.number().positive(),
});
