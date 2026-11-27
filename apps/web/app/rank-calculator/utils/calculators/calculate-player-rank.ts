import type { ItemCategory } from "@/app/schemas/items";
import type { Rank } from "@/config/enums";
import type { RankCalculatorSchema } from "../../[player]/submit-rank-calculator-validation";
import { calculateAchievementDiaryPoints } from "./calculate-achievement-diary-points";
import { calculateCollectionLogPoints } from "./calculate-collection-log-points";
import { calculateCollectionLogSlotPoints } from "./calculate-collection-log-slot-points";
import { calculateCombatAchievementPoints } from "./calculate-combat-achievement-points";
import { calculateCombatPoints } from "./calculate-combat-points";
import { calculateEhbPoints } from "./calculate-ehb-points";
import { calculateEhpPoints } from "./calculate-ehp-points";
import { calculateNotableItemsPoints } from "./calculate-notable-items-points";
import { calculateRank } from "./calculate-rank";
import { calculateScaling } from "./calculate-scaling";
import { calculateSkillingPoints } from "./calculate-skilling-points";
import { calculateTotalLevelPoints } from "./calculate-total-level-points";
import { calculateTotalPoints } from "./calculate-total-points";
import { calculateAchievementDiaryCapePoints } from "./calculate-achievement-diary-cape-points";
import { calculateMaxCapePoints } from "./calculate-max-cape-points";
import { calculateTzhaarCapePoints } from "./calculate-tzhaar-cape-points";
import { calculateBloodTorvaPoints } from "./calculate-blood-torva-points";
import { calculateDizanasQuiverPoints } from "./calculate-dizanas-quiver-points";

export type PlayerRankInput = Pick<
  RankCalculatorSchema,
  | "joinDate"
  | "collectionLogCount"
  | "collectionLogTotal"
  | "acquiredItems"
  | "achievementDiaries"
  | "ehp"
  | "ehb"
  | "totalLevel"
  | "combatAchievementTier"
  | "rankStructure"
  | "tzhaarCape"
  | "hasBloodTorva"
  | "hasDizanasQuiver"
  | "hasAchievementDiaryCape"
  | "hasMaxCape"
  | "collectionLogBonusMultiplier"
  | "combatBonusMultiplier"
  | "notableItemsBonusMultiplier"
  | "skillingBonusMultiplier"
>;

export function calculatePlayerRank(
  {
    joinDate,
    collectionLogTotal,
    collectionLogCount,
    acquiredItems,
    achievementDiaries,
    ehp,
    ehb,
    totalLevel,
    combatAchievementTier,
    rankStructure,
    tzhaarCape,
    hasBloodTorva,
    hasDizanasQuiver,
    hasAchievementDiaryCape,
    hasMaxCape,
    collectionLogBonusMultiplier,
    combatBonusMultiplier,
    notableItemsBonusMultiplier,
    skillingBonusMultiplier,
  }: PlayerRankInput,
  notableItems: [string, ItemCategory][],
): { rank: Rank; totalPoints: number } {
  const scaling = calculateScaling(joinDate);
  const collectionLogSlotPoints = calculateCollectionLogSlotPoints(collectionLogCount, scaling);
  const { pointsAwarded: totalCollectionLogPoints } = calculateCollectionLogPoints(
    collectionLogSlotPoints,
    collectionLogTotal,
    collectionLogBonusMultiplier,
    scaling,
  );
  const { pointsAwarded: totalNotableItemsPoints } = calculateNotableItemsPoints(
    notableItems,
    acquiredItems,
    notableItemsBonusMultiplier,
    scaling,
  );
  const { pointsAwarded: achievementDiariesPoints } = calculateAchievementDiaryPoints(
    achievementDiaries,
    scaling,
  );
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
  const dizanasQuiverPoints = calculateDizanasQuiverPoints(hasDizanasQuiver, scaling);
  const { pointsAwarded: totalCombatPoints } = calculateCombatPoints(
    ehbPoints,
    combatAchievementTierPoints,
    tzhaarCapePoints,
    bloodTorvaPoints,
    dizanasQuiverPoints,
    combatBonusMultiplier,
    scaling,
  );
  const totalPointsAwarded = calculateTotalPoints(
    totalCollectionLogPoints,
    totalNotableItemsPoints,
    totalSkillingPoints,
    totalCombatPoints,
  );

  const { rank } = calculateRank(
    totalPointsAwarded,
    rankStructure,
    collectionLogTotal,
    notableItems,
  );

  return { rank, totalPoints: totalPointsAwarded };
}
