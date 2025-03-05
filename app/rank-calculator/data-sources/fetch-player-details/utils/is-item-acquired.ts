import { stripEntityName } from '@/app/rank-calculator/utils/strip-entity-name';
import {
  isCollectionLogItem,
  isCombatAchievementItem,
  isCustomItem,
  isQuestItem,
  Item,
} from '@/app/schemas/items';
import { MiniQuest, Quest } from '@/app/schemas/osrs';
import { AchievementDiaryMap } from '@/app/schemas/rank-calculator';
import {
  CollectionLogAcquiredItemMap,
  LevelMap,
  QuestStatus,
} from '@/app/schemas/wiki';

interface IsItemAcquiredData {
  acquiredItems: CollectionLogAcquiredItemMap | null;
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
      // Since the WikiSync plugin does not provide an amount collected for each item, we can only automatically
      // determine single item collection logs. This means items that require multiple of the same item to be collected
      // (such as Burning Claws requiring 2x Burning Claw) will not be automatically marked as acquired.
      ({ amount, clogName }) =>
        amount === 1 && acquiredItems[stripEntityName(clogName)],
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
