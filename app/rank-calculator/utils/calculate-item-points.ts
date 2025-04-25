import { CollectionLogItemName } from '@/app/schemas/osrs';
import {
  defaultEhbRate,
  dropRateModifiers,
  ehbRates,
  itemBossNameMap,
} from '@/config/ehb-rates';
import { fetchDroppedItemInfo } from '../data-sources/fetch-dropped-item-info';

export async function calculateItemPoints(
  items: NonEmptyArray<
    [itemName: CollectionLogItemName, targetDropSource?: string]
  >,
) {
  const itemInfo = await Promise.all(
    items.map(([itemName]) => fetchDroppedItemInfo(itemName)),
  );

  if (itemInfo.includes(null)) {
    return 0;
  }

  const pointsPerHour = 5;

  const rawPoints = itemInfo.reduce((acc, item, i) => {
    if (!item) {
      throw new Error('Cannot find item data');
    }

    const [, targetDropSource] = items[i];

    const maybeFilteredResults = targetDropSource
      ? item.filter((result) => result['Dropped from'] === targetDropSource)
      : item;

    const [{ Rarity: itemRarity, 'Dropped from': dropSource }] =
      maybeFilteredResults;

    const bossName = itemBossNameMap[dropSource] ?? dropSource;
    const bossEhb = ehbRates[bossName] ?? defaultEhbRate;
    const dropRateModifier = dropRateModifiers[dropSource] ?? 1;

    if (!bossEhb) {
      throw new Error('Boss EHB could not be found');
    }

    return (
      acc + (1 / (itemRarity * dropRateModifier) / bossEhb) * pointsPerHour
    );
  }, 0);

  return Math.ceil(rawPoints);
}
