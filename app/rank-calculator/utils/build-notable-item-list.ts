import { isCollectionLogItem, Item, ItemCategory } from '@/app/schemas/items';
import { DroppedItemResponse } from '@/app/schemas/wiki';
import { itemList } from '@/data/item-list';
import { clientConstants } from '@/config/constants.client';
import { unstable_cache } from 'next/cache';
import { calculateItemPoints } from './calculate-item-points';

export const buildNotableItemList = unstable_cache(
  async (
    notableItemConfig: typeof itemList,
    dropRates: DroppedItemResponse,
    h: number,
  ) =>
    Object.entries(notableItemConfig).reduce(
      (acc, [key, category]) => {
        const items = category.items.map((item) => {
          if (item.points) {
            return {
              ...item,
              points:
                (item.points /
                  clientConstants.calculator.notableItemsPointsPerHour) *
                h,
            };
          }

          if (isCollectionLogItem(item)) {
            return {
              ...item,
              points: calculateItemPoints(
                dropRates,
                item.requiredItems,
                h || clientConstants.calculator.notableItemsPointsPerHour,
              ),
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
