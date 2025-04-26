import {
  defaultEhbRate,
  dropRateModifiers,
  ehbRates,
  itemBossNameMap,
} from '@/config/ehb-rates';
import { RequiredItem } from '@/app/schemas/items';
import Decimal from 'decimal.js-light';
import { DroppedItemResponse } from '@/app/schemas/wiki';

function calculatePointsForSingleDropSource(
  dropSource: string,
  amount: number,
  itemDropRate: number,
) {
  const pointsPerHour = 5;
  const bossName = itemBossNameMap[dropSource] ?? dropSource;
  const bossEhb = ehbRates[bossName] ?? defaultEhbRate;
  const dropRateModifier = dropRateModifiers[dropSource] ?? 1;

  if (!bossEhb) {
    throw new Error('Boss EHB could not be found');
  }

  return new Decimal(1)
    .dividedBy(new Decimal(itemDropRate).times(dropRateModifier))
    .dividedBy(bossEhb)
    .times(pointsPerHour)
    .times(amount)
    .toNumber();
}

export function calculateItemPoints(
  dropRateInfo: DroppedItemResponse,
  items: NonEmptyArray<RequiredItem>,
): number {
  const rawPoints = items.reduce(
    (
      acc,
      {
        amount,
        clogName,
        targetDropSources = Object.keys(dropRateInfo[clogName]),
      },
    ) => {
      const totalPointsForDropSources = targetDropSources.reduce(
        (sum, dropSource) =>
          sum +
          calculatePointsForSingleDropSource(
            dropSource,
            amount,
            dropRateInfo[clogName][dropSource],
          ),
        0,
      );

      // Find the mean points for all drop sources
      return acc + totalPointsForDropSources / targetDropSources.length;
    },
    0,
  );

  return Math.ceil(rawPoints);
}
