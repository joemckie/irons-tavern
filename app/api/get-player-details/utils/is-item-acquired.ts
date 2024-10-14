import {
  CollectionLogItem,
  CombatAchievementItem,
  Item,
  QuestItem,
} from '@/types/rank-calculator';

interface IsItemAcquiredData {
  collectionLogItems: Record<string, number>;
}

function isCollectionLogItem(item: Item): item is CollectionLogItem {
  return (item as CollectionLogItem).requiredItems !== undefined;
}

function isCombatAchievementItem(item: Item): item is CombatAchievementItem {
  return (
    (item as CombatAchievementItem).requiredCombatAchievements !== undefined
  );
}

function isQuestItem(item: Item): item is QuestItem {
  return (item as QuestItem).requiredQuests !== undefined;
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

  if (isCombatAchievementItem(item)) {
    return false;
  }

  if (isQuestItem(item)) {
    return false;
  }

  return false;
}
