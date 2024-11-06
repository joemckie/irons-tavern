import { z } from 'zod';
import { zfd } from 'zod-form-data';
import {
  combatAchievementTierValues,
  diaryLocationSchema,
  diaryTierSchema,
  skillsCount,
} from '@/types/osrs';
import { playerName } from '@/app/schemas/player';
import { rankStructureSchema } from '@/types/rank-calculator';

export const submitRankCalculatorSchema = zfd.formData({
  acquiredItems: z.record(z.boolean().optional()),
  achievementDiaries: z.record(diaryLocationSchema, diaryTierSchema),
  joinDate: z.date(),
  collectionLogCount: z.coerce.number().positive(),
  collectionLogTotal: z.coerce.number().positive(),
  combatAchievementTier: z.enum(combatAchievementTierValues),
  ehb: z.coerce.number().positive(),
  ehp: z.coerce.number().positive(),
  totalLevel: z.coerce.number().min(skillsCount),
  playerName,
  rankStructure: rankStructureSchema,
  rank: z.string(),
  points: z.number().positive(),
});
