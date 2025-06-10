import JSum from 'jsum';
import {
  isCollectionLogItem,
  Item,
  ItemCategoryMap,
} from '@/app/schemas/items';
import { DroppedItemResponse } from '@/app/schemas/wiki';
import { itemList } from '@/data/item-list';
import { unstable_cache } from 'next/cache';
import * as itemPointMap from '@/app/rank-calculator/config/item-point-map';
import * as efficiencyData from '@/app/rank-calculator/config/efficiency-rates';
import * as Sentry from '@sentry/nextjs';
import { calculateItemPoints } from './calculate-item-points';
import { pointsConfig } from '../config/points';

const efficiencyDataChecksum = JSum.digest(efficiencyData, 'SHA256', 'hex');
const itemPointMapChecksum = JSum.digest(itemPointMap, 'SHA256', 'hex');

export const buildNotableItemList = unstable_cache(
  // eslint-disable-next-line @typescript-eslint/require-await
  async (notableItemConfig: typeof itemList, dropRates: DroppedItemResponse) =>
    Object.entries(notableItemConfig).reduce<ItemCategoryMap>(
      (acc, [key, category]) => {
        const items = category.items.map((item) => {
          if (item.points) {
            return item;
          }

          if (isCollectionLogItem(item)) {
            try {
              return {
                ...item,
                points: calculateItemPoints(dropRates, item.requiredItems),
              };
            } catch (error) {
              Sentry.captureException(error);

              return { ...item, hasPointsError: true };
            }
          }

          throw new Error(`Could not calculate item points for ${item.name}`);
        }, []);

        return {
          ...acc,
          [key]: { ...category, items: items as NonEmptyArray<Item> },
        };
      },
      {},
    ),
  [
    `points-per-hour:${pointsConfig.notableItemsPointsPerHour}`,
    `efficiency-data:${efficiencyDataChecksum}`,
    `item-point-map:${itemPointMapChecksum}`,
  ],
);
