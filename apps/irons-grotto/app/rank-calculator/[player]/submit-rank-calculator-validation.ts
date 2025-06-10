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
import { isAchievementDiaryCapeAchieved } from '../utils/is-achievement-diary-cape-achieved';

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
  hasBloodTorva: z.boolean().default(false),
  hasDizanasQuiver: z.boolean().default(false),
  hasMaxCape: z.boolean().default(false),
  hasAchievementDiaryCape: z.boolean().default(false),
  combatBonusMultiplier: z.number().min(0).default(0),
  skillingBonusMultiplier: z.number().min(0).default(0),
  collectionLogBonusMultiplier: z.number().min(0).default(0),
  notableItemsBonusMultiplier: z.number().min(0).default(0),
});

export type RankCalculatorSchema = z.infer<typeof RankCalculatorSchema>;

export const RankCalculatorValidator = RankCalculatorSchema.superRefine(
  (
    { hasMaxCape, totalLevel, achievementDiaries, hasAchievementDiaryCape },
    ctx,
  ) => {
    if (
      hasAchievementDiaryCape &&
      !isAchievementDiaryCapeAchieved(achievementDiaries)
    ) {
      ctx.addIssue({
        code: 'custom',
        message:
          'You must have all achievement diaries completed to have the cape.',
        path: ['hasAchievementDiaryCape'],
      });
    }

    if (hasMaxCape && totalLevel !== maximumTotalLevel) {
      ctx.addIssue({
        code: 'custom',
        message: `Total level must be ${maximumTotalLevel} if you have a max cape.`,
        path: ['hasMaxCape'],
      });
    }
  },
);
