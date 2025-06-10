export function calculateTotalPoints(
  totalCollectionLogPoints: number,
  totalNotableItemsPoints: number,
  totalSkillingPoints: number,
  totalCombatPoints: number,
) {
  return (
    totalCollectionLogPoints +
    totalNotableItemsPoints +
    totalSkillingPoints +
    totalCombatPoints
  );
}
