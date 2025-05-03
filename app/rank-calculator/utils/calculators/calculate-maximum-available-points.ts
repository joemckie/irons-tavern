import { ItemCategory } from '@/app/schemas/items';
import { calculateMaximumCombatPoints } from './calculate-maximum-combat-points';
import { calculateMaximumSkillingPoints } from './calculate-maximum-skilling-points';
import { calculateMaximumNotableItemsPoints } from './calculate-maximum-notable-items-points';
import { calculatePointsForLogSlots } from './calculate-points-for-log-slots';

export function calculateMaximumAvailablePoints(
  items: [string, ItemCategory][],
  maximumCollectionLogSlotCount: number,
) {
  const maximumCombatPoints = calculateMaximumCombatPoints(1);
  const maximumSkillingPoints = calculateMaximumSkillingPoints(1);
  const maximumNotableItemsPoints = calculateMaximumNotableItemsPoints(
    items,
    1,
  );
  const maximumCollectionLogSlotPoints = calculatePointsForLogSlots(
    maximumCollectionLogSlotCount,
    1,
  );

  return (
    maximumCollectionLogSlotPoints +
    maximumSkillingPoints +
    maximumNotableItemsPoints +
    maximumCombatPoints
  );
}
