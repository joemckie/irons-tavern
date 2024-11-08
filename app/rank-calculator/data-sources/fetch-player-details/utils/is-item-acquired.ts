import { AcquiredItemMap } from '@/app/schemas/collection-log';
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
  acquiredItems: AcquiredItemMap | null;
  quests?: Record<Quest | MiniQuest, QuestStatus> | null;
  achievementDiaries: AchievementDiaryMap | null;
  levels?: LevelMap | null;
  totalLevel: number | null;
  musicTracks?: Record<string, boolean> | null;
  combatAchievements?: number[] | null;
}

export function isItemAcquired(
  item: Item,
  {
    acquiredItems,
    quests,
    achievementDiaries,
    levels,
    totalLevel,
    musicTracks,
    combatAchievements,
  }: IsItemAcquiredData,
) {
  if (acquiredItems && isCollectionLogItem(item)) {
    return item.requiredItems.every(
      ({ amount, clogName }) => acquiredItems?.[clogName] >= amount,
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
      acquiredItems,
      levels,
      musicTracks,
      totalLevel,
    });
  }

  return false;
}
