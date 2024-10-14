import {
  BaseItem,
  CollectionLogItem,
  CombatAchievementItem,
  Item,
  PlayerData,
  QuestItem,
} from '@/types/rank-calculator';

function isCollectionLogItem(item: Item): item is CollectionLogItem {
  return (item as CollectionLogItem).requiredItems !== undefined;
}

function isManualItem(item: Item): item is BaseItem {
  return (
    (item as CollectionLogItem).requiredItems === undefined &&
    (item as QuestItem).requiredQuests === undefined &&
    (item as CombatAchievementItem).requiredCombatAchievements === undefined
  );
}

export function isItemAcquired(item: Item, playerData: PlayerData | undefined) {
  if (isCollectionLogItem(item)) {
    return item.requiredItems.every(
      ({ amount, clogName }) =>
        (playerData?.collectionLogItems?.[clogName] ?? 0) >= amount,
    );
  }

  return false;
}
