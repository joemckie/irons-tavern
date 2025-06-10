import { TavernDiaryTier } from '@/app/schemas/tavern-diaries';
import { invert } from 'lodash';

export const tavernDiaryTierMultipliers = {
  Drunkard: 0.05,
  Bartender: 0.1,
  Landlord: 0.2,
  Baron: 0.3,
  Duke: 0.4,
} as const satisfies Record<TavernDiaryTier, number>;

export const tavernDiaryTierNameByMultiplier = invert(
  tavernDiaryTierMultipliers,
);
