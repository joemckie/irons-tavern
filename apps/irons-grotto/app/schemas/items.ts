import { z } from 'zod';
import { CollectionLogItemName, MiniQuest, Quest, Skill } from './osrs';
import { TempleOSRSCollectionLogCategory } from './temple-api';

export const BaseItem = z.object({
  image: z.string(),
  name: z.string(),
  points: z.number(),
});

export type BaseItem = z.infer<typeof BaseItem>;

export const RequiredItem = z.object({
  clogName: CollectionLogItemName,
  amount: z.number().positive(),
  targetDropSources: z.array(z.string()).nonempty().optional(),
  ignoreDropRateModifier: z.literal(true).optional(),
  ignoreAmountMultiplier: z.literal(true).optional(),
  ignorePoints: z.literal(true).optional(),
});

export type RequiredItem = z.infer<typeof RequiredItem>;

export const CollectionLogItem = BaseItem.extend({
  requiredLevels: z.record(Skill, z.number()).optional(),
  requiredItems: z.array(RequiredItem).nonempty(),
  collectionLogCategories: z.array(TempleOSRSCollectionLogCategory).nonempty(),
  hasPointsError: z.boolean(),
});

export type CollectionLogItem = z.infer<typeof CollectionLogItem>;

export const CombatAchievementItem = BaseItem.extend({
  requiredCombatAchievements: z.array(z.number()).nonempty(),
});

export type CombatAchievementItem = z.infer<typeof CombatAchievementItem>;

export const QuestItem = BaseItem.extend({
  requiredQuests: z.array(z.union([Quest, MiniQuest])).nonempty(),
});

export type QuestItem = z.infer<typeof QuestItem>;

export const Item = z.union([
  BaseItem,
  CollectionLogItem,
  CombatAchievementItem,
  QuestItem,
]);

export type Item = z.infer<typeof Item>;

export const ItemCategory = z.object({
  image: z.string().optional(),
  items: z.array(Item).nonempty(),
});

export type ItemCategory = z.infer<typeof ItemCategory>;

export function isCollectionLogItem(item: unknown): item is CollectionLogItem {
  return CollectionLogItem.safeParse(item).success;
}

export function isCombatAchievementItem(
  item: unknown,
): item is CombatAchievementItem {
  return CombatAchievementItem.safeParse(item).success;
}

export function isQuestItem(item: unknown): item is QuestItem {
  return QuestItem.safeParse(item).success;
}

export const ItemCategoryMap = z.record(z.string(), ItemCategory);

export type ItemCategoryMap = z.infer<typeof ItemCategoryMap>;
