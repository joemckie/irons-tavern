import { isCollectionLogItem, Item, ItemCategory } from '@/app/schemas/items';
import { DroppedItemResponse } from '@/app/schemas/wiki';
import { itemList } from '@/data/item-list';
import { unstable_cache } from 'next/cache';
import { calculateItemPoints } from './calculate-item-points';

export const buildNotableItemList = unstable_cache(
  async (notableItemConfig: typeof itemList, dropRates: DroppedItemResponse) =>
    Object.entries(notableItemConfig).reduce(
      (acc, [key, category]) => {
        const items = category.items.map((item) => {
          if (isCollectionLogItem(item)) {
            return {
              ...item,
              points: calculateItemPoints(dropRates, item.requiredItems),
            };
          }

          throw new Error(`Could not calculate item points for ${item.name}`);
        }) as NonEmptyArray<Item>;

        return {
          ...acc,
          [key]: {
            ...category,
            items,
          },
        };
      },
      {} as Record<keyof typeof itemList, ItemCategory>,
    ),
);
