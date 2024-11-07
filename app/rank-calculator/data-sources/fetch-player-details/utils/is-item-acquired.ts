import { CollectionLogItemMap } from '@/app/schemas/collection-log';
import {
  isCollectionLogItem,
  isCombatAchievementItem,
  isCustomItem,
  isQuestItem,
  Item,
} from '@/app/schemas/items';
import { MiniQuest, Quest } from '@/app/schemas/osrs';
import { AchievementDiaryMap } from '@/app/schemas/rank-calculator';
import { LevelMap, QuestStatus } from '@/app/schemas/wiki';

interface IsItemAcquiredData {
  collectionLogItems: CollectionLogItemMap | null;
  quests: Record<Quest | MiniQuest, QuestStatus> | null;
  achievementDiaries: AchievementDiaryMap | null;
  levels: LevelMap | null;
  musicTracks: Record<string, boolean> | null;
  combatAchievements: number[] | null;
}

export function isItemAcquired(
  item: Item,
  {
    collectionLogItems,
    quests,
    achievementDiaries,
    levels,
    musicTracks,
    combatAchievements,
  }: IsItemAcquiredData,
) {
  if (collectionLogItems && isCollectionLogItem(item)) {
    return item.requiredItems.every(
      ({ amount, clogName }) => (collectionLogItems?.[clogName] ?? 0) >= amount,
    );
  }

  if (combatAchievements && isCombatAchievementItem(item)) {
    return item.requiredCombatAchievements.every((id) =>
      Boolean(combatAchievements.includes(id)),
    );
  }

  if (quests && isQuestItem(item)) {
    return item.requiredQuests.every(
      (quest) => quests[quest] === QuestStatus.enum.Completed,
    );
  }

  if (isCustomItem(item)) {
    return item.isAcquired({
      achievementDiaries,
      collectionLogItems,
      levels,
      musicTracks,
    });
  }

  return false;
}
