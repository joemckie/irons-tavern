import type { ItemCategory } from '@/app/schemas/items';
import type { PlayerDetailsResponse } from '../../data-sources/fetch-player-details/fetch-player-details';
import { calculateAchievementDiaryCapePoints } from './calculate-achievement-diary-cape-points';
import { calculateAchievementDiaryPoints } from './calculate-achievement-diary-points';
import { calculateBloodTorvaPoints } from './calculate-blood-torva-points';
import { calculateCollectionLogPoints } from './calculate-collection-log-points';
import { calculateCollectionLogSlotPoints } from './calculate-collection-log-slot-points';
import { calculateCombatAchievementPoints } from './calculate-combat-achievement-points';
import { calculateCombatPoints } from './calculate-combat-points';
import { calculateDizanasQuiverPoints } from './calculate-dizanas-quiver-points';
import { calculateEhbPoints } from './calculate-ehb-points';
import { calculateEhpPoints } from './calculate-ehp-points';
import { calculateMaxCapePoints } from './calculate-max-cape-points';
import { calculateNotableItemsPoints } from './calculate-notable-items-points';
import { calculateScaling } from './calculate-scaling';
import { calculateSkillingPoints } from './calculate-skilling-points';
import { calculateTotalLevelPoints } from './calculate-total-level-points';
import { calculateTotalPoints } from './calculate-total-points';
import { calculateTzhaarCapePoints } from './calculate-tzhaar-cape-points';

export function calculateTotalPointsAwarded(
  {
    joinDate,
    collectionLogTotal,
    achievementDiaries,
    collectionLogCount,
    acquiredItems,
    ehp,
    ehb,
    totalLevel,
    combatAchievementTier,
    hasAchievementDiaryCape,
    hasMaxCape,
    hasBloodTorva,
    hasDizanasQuiver,
    skillingBonusMultiplier,
    combatBonusMultiplier,
    collectionLogBonusMultiplier,
    notableItemsBonusMultiplier,
    tzhaarCape,
  }: Pick<
    PlayerDetailsResponse,
    | 'joinDate'
    | 'collectionLogTotal'
    | 'achievementDiaries'
    | 'collectionLogCount'
    | 'acquiredItems'
    | 'ehp'
    | 'ehb'
    | 'totalLevel'
    | 'combatAchievementTier'
    | 'hasAchievementDiaryCape'
    | 'hasMaxCape'
    | 'hasBloodTorva'
    | 'hasDizanasQuiver'
    | 'skillingBonusMultiplier'
    | 'combatBonusMultiplier'
    | 'collectionLogBonusMultiplier'
    | 'notableItemsBonusMultiplier'
    | 'tzhaarCape'
  >,
  items: [string, ItemCategory][],
) {
  const scaling = calculateScaling(joinDate);
  const collectionLogSlotPoints = calculateCollectionLogSlotPoints(
    collectionLogCount,
    scaling,
  );
  const { pointsAwarded: totalCollectionLogPoints } =
    calculateCollectionLogPoints(
      collectionLogSlotPoints,
      collectionLogTotal,
      collectionLogBonusMultiplier,
      scaling,
    );
  const { pointsAwarded: totalNotableItemsPoints } =
    calculateNotableItemsPoints(
      items,
      acquiredItems,
      notableItemsBonusMultiplier,
      scaling,
    );
  const { pointsAwarded: achievementDiariesPoints } =
    calculateAchievementDiaryPoints(achievementDiaries, scaling);
  const ehpPoints = calculateEhpPoints(ehp, scaling);
  const totalLevelPoints = calculateTotalLevelPoints(totalLevel, scaling);
  const achievementDiaryCapePoints = calculateAchievementDiaryCapePoints(
    hasAchievementDiaryCape,
    scaling,
  );
  const maxCapePoints = calculateMaxCapePoints(hasMaxCape, scaling);
  const { pointsAwarded: totalSkillingPoints } = calculateSkillingPoints(
    achievementDiariesPoints,
    ehpPoints,
    totalLevelPoints,
    achievementDiaryCapePoints,
    maxCapePoints,
    skillingBonusMultiplier,
    scaling,
  );
  const ehbPoints = calculateEhbPoints(ehb, scaling);
  const combatAchievementTierPoints = calculateCombatAchievementPoints(
    combatAchievementTier,
    scaling,
  );
  const tzhaarCapePoints = calculateTzhaarCapePoints(tzhaarCape, scaling);
  const bloodTorvaPoints = calculateBloodTorvaPoints(hasBloodTorva, scaling);
  const dizanasQuiverPoints = calculateDizanasQuiverPoints(
    hasDizanasQuiver,
    scaling,
  );
  const { pointsAwarded: totalCombatPoints } = calculateCombatPoints(
    ehbPoints,
    combatAchievementTierPoints,
    tzhaarCapePoints,
    bloodTorvaPoints,
    dizanasQuiverPoints,
    combatBonusMultiplier,
    scaling,
  );

  return calculateTotalPoints(
    totalCollectionLogPoints,
    totalNotableItemsPoints,
    totalSkillingPoints,
    totalCombatPoints,
  );
}
