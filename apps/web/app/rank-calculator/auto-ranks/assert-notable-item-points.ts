import type { ItemCategory } from "@/app/schemas/items";

/**
 * Notable items with a points error (e.g. missing drop rates) make every rank threshold NaN,
 * which collapses every member's rank. Fail the whole report instead.
 */
export function assertNotableItemPoints(notableItems: [string, ItemCategory][]) {
  const invalidItems = notableItems
    .flatMap(([, { items }]) => items)
    .filter(
      (item) => ("hasPointsError" in item && item.hasPointsError) || !Number.isFinite(item.points),
    )
    .map(({ name }) => name);

  if (invalidItems.length > 0) {
    throw new Error(`Unable to calculate notable item points for ${invalidItems.join(", ")}`);
  }
}
