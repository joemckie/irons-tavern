import { RankCalculatorSchema } from '../rank-calculator/[player]/submit-rank-calculator-validation';
import { Rank } from '@/config/enums';
import { z } from 'zod';

export const PlayerDetailsResponse = RankCalculatorSchema.omit({
  rank: true,
  points: true,
}).extend({
  currentRank: Rank.optional(),
  hasTemplePlayerStats: z.boolean(),
  hasTempleCollectionLog: z.boolean(),
  hasWikiSyncData: z.boolean(),
  hasThirdPartyData: z.boolean(),
  isTempleCollectionLogOutdated: z.boolean(),
  isMobileOnly: z.boolean(),
});

export type PlayerDetailsResponse = z.infer<typeof PlayerDetailsResponse>;
