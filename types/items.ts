import { CollectionLogItemMap } from './collection-log';
import { MiniQuest, Quest } from './osrs';
import { AchievementDiaryMap } from './rank-calculator';
import { LevelMap } from './wiki-sync';

export interface RequiredItem {
  clogName: string;
  amount: number;
}

export interface BaseItem {
  image: string;
  name: string;
  points: number;
}

export interface CollectionLogItem extends BaseItem {
  requiredLevels?: AtLeastOne<LevelMap>;
  requiredItems: NonEmptyArray<RequiredItem>;
}

export interface CombatAchievementItem extends BaseItem {
  requiredCombatAchievements: NonEmptyArray<number>;
}

export interface QuestItem extends BaseItem {
  requiredQuests: NonEmptyArray<Quest | MiniQuest>;
}

export interface CustomItem extends BaseItem {
  isAcquired: (playerData: {
    achievementDiaries: AchievementDiaryMap | null;
    collectionLogItems: CollectionLogItemMap | null;
    levels: LevelMap | null;
    musicTracks: Record<string, boolean> | null;
  }) => boolean;
}

export type Item =
  | BaseItem
  | CollectionLogItem
  | CombatAchievementItem
  | QuestItem
  | CustomItem;

export interface ItemCategory {
  image?: string;
  items: NonEmptyArray<Item>;
}

export type ItemCategoryMap = Record<string, ItemCategory>;

export function isCollectionLogItem(item: Item): item is CollectionLogItem {
  return (item as CollectionLogItem).requiredItems !== undefined;
}

export function isCombatAchievementItem(
  item: Item,
): item is CombatAchievementItem {
  return (
    (item as CombatAchievementItem).requiredCombatAchievements !== undefined
  );
}

export function isQuestItem(item: Item): item is QuestItem {
  return (item as QuestItem).requiredQuests !== undefined;
}

export function isCustomItem(item: Item): item is CustomItem {
  return (item as CustomItem).isAcquired !== undefined;
}
