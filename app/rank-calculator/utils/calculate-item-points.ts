import {
  defaultEhbRate,
  dropRateModifiers,
  ehbRates,
  itemBossNameMap,
} from '@/config/ehb-rates';
import { RequiredItem } from '@/app/schemas/items';
import Decimal from 'decimal.js-light';
import { DroppedItemResponse } from '@/app/schemas/wiki';

export function calculateItemPoints(
  dropRateInfo: DroppedItemResponse,
  items: NonEmptyArray<RequiredItem>,
) {
  const pointsPerHour = 5;

  const rawPoints = items.reduce(
    (acc, { amount, clogName, targetDropSource }) => {
      const itemDropRates = dropRateInfo[clogName];

      if (!itemDropRates) {
        throw new Error('Cannot find item drop rates!');
      }

      const [dropSource, itemRarity] = targetDropSource
        ? [targetDropSource, itemDropRates[targetDropSource]]
        : Object.entries(itemDropRates)[0];

      const bossName = itemBossNameMap[dropSource] ?? dropSource;
      const bossEhb = ehbRates[bossName] ?? defaultEhbRate;
      const dropRateModifier = dropRateModifiers[dropSource] ?? 1;

      if (!bossEhb) {
        throw new Error('Boss EHB could not be found');
      }

      const points = new Decimal(1)
        .dividedBy(new Decimal(itemRarity).times(dropRateModifier))
        .dividedBy(bossEhb)
        .times(pointsPerHour);

      return acc + points.times(amount).toNumber();
    },
    0,
  );

  return Math.ceil(rawPoints);
}
