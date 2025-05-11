import { calculatePointsForLogSlots } from './calculate-points-for-log-slots';

export function calculateCollectionLogSlotPoints(
  collectionLogSlots: number,
  scaling: number,
) {
  if (collectionLogSlots === 0) {
    return 0;
  }

  return calculatePointsForLogSlots(collectionLogSlots, scaling);
}
