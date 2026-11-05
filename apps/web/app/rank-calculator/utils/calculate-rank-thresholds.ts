import { RankStructure } from '@/app/schemas/rank-calculator';
import { Rank } from '@/config/enums';
import { rankFactors, StandardRank } from '@/config/ranks';
import { calculateMaximumNotableItemsPoints } from './calculators/calculate-maximum-notable-items-points';
import { calculateEffectiveCombatPoints } from './calculate-effective-combat-points';
import { calculateEffectiveSkillingPoints } from './calculate-effective-skilling-points';
import { calculateEffectiveCollectionLogPoints } from './calculate-effective-collection-log-points';
import type { ItemCategory } from '@/app/schemas/items';
import type { z } from 'zod';

export const calculateRankThresholds = (
  totalCollectionLogSlots: number,
  notableItems: [string, ItemCategory][],
): Record<RankStructure, Partial<Record<Rank, number>>> => {
  const DerivedRank = StandardRank.exclude(['Helper', 'Steel']);
  const standardRankPoints: Record<
    z.infer<typeof DerivedRank>,
    number
  > = {} as Record<z.infer<typeof DerivedRank>, number>;

  for (const rank of DerivedRank.options) {
    const effectiveCombatPoints = calculateEffectiveCombatPoints(rank);
    const effectiveSkillingPoints = calculateEffectiveSkillingPoints(rank);
    const effectiveCollectionLogPoints = calculateEffectiveCollectionLogPoints(
      totalCollectionLogSlots,
      rank,
    );
    const effectiveNotableItemsPoints = calculateMaximumNotableItemsPoints(
      notableItems,
      1,
    );

    const totalEffectivePoints =
      effectiveCombatPoints +
      effectiveSkillingPoints +
      effectiveCollectionLogPoints +
      effectiveNotableItemsPoints;
    const rankPoints =
      Math.ceil((totalEffectivePoints * rankFactors[rank]) / 1000) * 1000;

    standardRankPoints[rank] = rankPoints;
  }

  return {
    Standard: { Helper: 0, Steel: 1, ...standardRankPoints },
    Legacy: { Legacy: 0 },
    Admin: {
      Captain: 0,
      General: standardRankPoints.Striker,
      Colonel: standardRankPoints.Legend,
      Brigadier: standardRankPoints.Sage,
      Admiral: standardRankPoints.Skulled,
      Marshal: standardRankPoints.Beast,
    },
    Moderator: { Moderator: 0 },
    'Deputy Owner': { 'Deputy Owner': 0 },
    Owner: { Owner: 0 },
  };
};
