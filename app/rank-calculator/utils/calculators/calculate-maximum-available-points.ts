import { calculateMaximumCombatAchievementPoints } from './calculate-maximum-combat-achievement-points';
import { calculateMaximumSkillingPoints } from './calculate-maximum-skilling-points';
import { calculateMaximumNotableItemsPoints } from './calculate-maximum-notable-items-points';
import { calculatePointsForLogSlots } from './calculate-points-for-log-slots';

export async function calculateMaximumAvailablePoints(
  maximumCollectionLogSlotCount: number,
) {
  const maximumCombatAchievementPoints =
    calculateMaximumCombatAchievementPoints(1);
  const maximumSkillingPoints = calculateMaximumSkillingPoints(1);
  const maximumNotableItemsPoints = await calculateMaximumNotableItemsPoints(1);
  const maximumCollectionLogSlotPoints = calculatePointsForLogSlots(
    maximumCollectionLogSlotCount,
    1,
  );

  return (
    maximumCollectionLogSlotPoints +
    maximumSkillingPoints +
    maximumNotableItemsPoints +
    maximumCombatAchievementPoints
  );
}
