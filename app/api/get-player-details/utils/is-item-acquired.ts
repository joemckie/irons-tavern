import { CollectionLogItem, Item } from '@/types/rank-calculator';

function isCollectionLogItem(item: Item): item is CollectionLogItem {
  return (item as CollectionLogItem).requiredItems !== undefined;
}
interface IsItemAcquiredData {
  collectionLogItems: Record<string, number>;
}

export function isItemAcquired(
  item: Item,
  { collectionLogItems }: IsItemAcquiredData,
) {
  if (isCollectionLogItem(item)) {
    return item.requiredItems.every(
      ({ amount, clogName }) => (collectionLogItems?.[clogName] ?? 0) >= amount,
    );
  }

  return false;
}
