import { isCollectionLogItem, Item, ItemCategory } from '@/app/schemas/items';
import { DroppedItemResponse } from '@/app/schemas/wiki';
import { itemList } from '@/data/item-list';
import { calculateItemPoints } from './calculate-item-points';

export function buildNotableItemList(dropRates: DroppedItemResponse) {
  return Object.fromEntries(
    Object.entries(itemList).map(([key, category]) => {
      const items = category.items.map((item) => {
        if (item.points) {
          return item;
        }

        if (isCollectionLogItem(item)) {
          return {
            ...item,
            points: calculateItemPoints(dropRates, item.requiredItems),
          };
        }

        throw new Error(`Could not calculate item points for ${item.name}`);
      }) as NonEmptyArray<Item>;

      return [key, { ...category, items }] as [
        keyof typeof itemList,
        ItemCategory,
      ];
    }),
  );
}
