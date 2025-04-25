import { CollectionLogItemName } from '@/app/schemas/osrs';
import {
  defaultEhbRate,
  dropRateModifiers,
  ehbRates,
  itemBossNameMap,
} from '@/config/ehb-rates';
import { fetchDroppedItemInfo } from '../data-sources/fetch-dropped-item-info';

export async function calculateItemPoints(item: CollectionLogItemName) {
  const itemInfo = await fetchDroppedItemInfo(item);

  if (!itemInfo) {
    return 0;
  }

  const pointsPerHour = 5;
  const [{ Rarity: itemRarity, 'Dropped from': dropSource }] = itemInfo;
  const bossName = itemBossNameMap[dropSource] ?? dropSource;
  const bossEhb = ehbRates[bossName] ?? defaultEhbRate;
  const dropRateModifier = dropRateModifiers[dropSource] ?? 1;

  if (!bossEhb) {
    throw new Error('Boss EHB could not be found');
  }

  return Math.ceil(
    (1 / (itemRarity * dropRateModifier) / bossEhb) * pointsPerHour,
  );
}
