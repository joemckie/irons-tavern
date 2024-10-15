import { CollectionLogItemMap } from '@/types/collection-log';
import {
  CollectionLogItem,
  CombatAchievementItem,
  CustomItem,
  Item,
  MiniQuest,
  Quest,
  QuestItem,
  QuestStatus,
  LevelMap,
  AchievementDiaryMap,
} from '@/types/rank-calculator';

interface IsItemAcquiredData {
  collectionLogItems: CollectionLogItemMap | null;
  quests: Record<Quest | MiniQuest, QuestStatus> | null;
  achievementDiaries: AchievementDiaryMap | null;
  levels: LevelMap | null;
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

function isCustomItem(item: Item): item is CustomItem {
  return (item as CustomItem).isAcquired !== undefined;
}

export function isItemAcquired(
  item: Item,
  {
    collectionLogItems,
    quests,
    achievementDiaries,
    levels,
  }: IsItemAcquiredData,
) {
  if (isCollectionLogItem(item)) {
    return (
      collectionLogItems &&
      item.requiredItems.every(
        ({ amount, clogName }) =>
          (collectionLogItems?.[clogName] ?? 0) >= amount,
      )
    );
  }

  if (isCombatAchievementItem(item)) {
    return false;
  }

  if (isQuestItem(item)) {
    return (
      quests &&
      item.requiredQuests.every(
        (quest) => quests[quest] === QuestStatus.Completed,
      )
    );
  }

  if (isCustomItem(item)) {
    return item.isAcquired({
      achievementDiaries,
      collectionLogItems,
      levels,
    });
  }

  return false;
}
