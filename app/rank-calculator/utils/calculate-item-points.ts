import { CollectionLogItemName } from '@/app/schemas/osrs';
import {
  defaultEhbRate,
  dropRateModifiers,
  ehbRates,
  itemBossNameMap,
} from '@/config/ehb-rates';
import Decimal from 'decimal.js-light';
import { fetchItemDropRates } from '../data-sources/fetch-dropped-item-info';

export async function calculateItemPoints(
  items: NonEmptyArray<
    [itemName: CollectionLogItemName, targetDropSource?: string]
  >,
) {
  const dropRateInfo = await fetchItemDropRates();

  if (!dropRateInfo) {
    throw new Error('Unable to retrieve drop rate info!');
  }

  const pointsPerHour = 5;

  const rawPoints = items.reduce((acc, [itemName], i) => {
    const itemDropRates = dropRateInfo[itemName];

    if (!itemDropRates) {
      throw new Error('Cannot find item drop rates!');
    }

    const [, targetDropSource] = items[i];

    const maybeFilteredResults = targetDropSource
      ? itemDropRates.filter(
          (result) => result['Dropped from'] === targetDropSource,
        )
      : itemDropRates;

    const [{ Rarity: itemRarity, 'Dropped from': dropSource }] =
      maybeFilteredResults;

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

    return acc + points.toNumber();
  }, 0);

  return Math.ceil(rawPoints);
}
