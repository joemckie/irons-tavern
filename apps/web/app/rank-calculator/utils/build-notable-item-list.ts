import JSum from 'jsum';
import { isCollectionLogItem, ItemCategoryMap } from '@/app/schemas/items';
import { DroppedItemResponse } from '@/app/schemas/wiki';
import { itemList } from '@/data/item-list';
import { cacheTag } from 'next/cache';
import * as itemPointMap from '@/app/rank-calculator/config/item-point-map';
import * as efficiencyData from '@/app/rank-calculator/config/efficiency-rates';
import * as Sentry from '@sentry/nextjs';
import { calculateItemPoints } from './calculate-item-points';
import { pointsConfig } from '../config/points';

const itemListChecksum = JSum.digest(itemList, 'SHA256', 'hex');
const efficiencyDataChecksum = JSum.digest(efficiencyData, 'SHA256', 'hex');
const itemPointMapChecksum = JSum.digest(itemPointMap, 'SHA256', 'hex');

export const buildNotableItemList =
  // eslint-disable-next-line @typescript-eslint/require-await
  async (dropRates: DroppedItemResponse) => {
    'use cache: remote';

    cacheTag(
      `points-per-hour:${pointsConfig.notableItemsPointsPerHour}`,
      `item-list:${itemListChecksum}`,
      `efficiency-data:${efficiencyDataChecksum}`,
      `item-point-map:${itemPointMapChecksum}`,
    );

    return Object.entries(itemList).reduce<ItemCategoryMap>(
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
          [key]: { ...category, items: items },
        };
      },
      {},
    );
  };
