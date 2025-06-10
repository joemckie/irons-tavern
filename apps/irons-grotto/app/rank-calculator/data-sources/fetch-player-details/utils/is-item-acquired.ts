import { stripEntityName } from '@/app/rank-calculator/utils/strip-entity-name';
import {
  isCollectionLogItem,
  isCombatAchievementItem,
  isQuestItem,
  Item,
} from '@/app/schemas/items';
import { MiniQuest, Quest } from '@/app/schemas/osrs';
import { CollectionLogAcquiredItemMap, QuestStatus } from '@/app/schemas/wiki';

interface IsItemAcquiredData {
  acquiredItems: CollectionLogAcquiredItemMap | null;
  quests?: Record<Quest | MiniQuest, QuestStatus> | null;
  musicTracks?: Record<string, boolean> | null;
  combatAchievements?: number[] | null;
}

export function isItemAcquired(
  item: Item,
  { acquiredItems, quests, combatAchievements }: IsItemAcquiredData,
) {
  if (acquiredItems && isCollectionLogItem(item)) {
    return item.requiredItems.every(
      ({ amount, clogName }) =>
        acquiredItems[stripEntityName(clogName)] >= amount,
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

  return false;
}
