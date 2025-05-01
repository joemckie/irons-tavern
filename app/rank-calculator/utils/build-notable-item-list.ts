import { isCollectionLogItem, Item, ItemCategory } from '@/app/schemas/items';
import { DroppedItemResponse } from '@/app/schemas/wiki';
import { itemList } from '@/data/item-list';
import { clientConstants } from '@/config/constants.client';
import { calculateItemPoints } from './calculate-item-points';

export function buildNotableItemList(
  dropRates: DroppedItemResponse,
  h: number,
) {
  return Object.entries(itemList).reduce(
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
  );
}
