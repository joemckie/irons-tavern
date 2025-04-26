import { z } from 'zod';
import { CollectionLogItemName, MiniQuest, Quest, Skill } from './osrs';
import { AchievementDiaryMap } from './rank-calculator';
import { CollectionLogAcquiredItemMap, LevelMap } from './wiki';
import { TempleOSRSCollectionLogCategory } from './temple-api';
import { fetchItemDropRates } from '../rank-calculator/data-sources/fetch-dropped-item-info';
import { calculateItemPoints } from '../rank-calculator/utils/calculate-item-points';

export const BaseItem = z.object({
  image: z.string(),
  name: z.string(),
  points: z.number(),
  /**
   * Automatic items can be updated by the form as the user fills it in
   *
   * e.g. achievement diary cape, max cape
   * */
  isAutomatic: z.literal(true).optional(),
});

export type BaseItem = z.infer<typeof BaseItem>;

export const RequiredItem = z.object({
  clogName: CollectionLogItemName,
  amount: z.number(),
  targetDropSource: z.string().optional(),
});

export type RequiredItem = z.infer<typeof RequiredItem>;

export const CollectionLogItem = BaseItem.extend({
  requiredLevels: z.record(Skill, z.number()).optional(),
  requiredItems: z.array(RequiredItem).nonempty(),
  collectionLogCategories: z.array(TempleOSRSCollectionLogCategory).nonempty(),
  points: z.number().optional(),
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

export const CustomItem = BaseItem.extend({
  isAcquired: z
    .function()
    .args(
      z.object({
        achievementDiaries: AchievementDiaryMap.nullable(),
        acquiredItems: CollectionLogAcquiredItemMap.nullable(),
        levels: LevelMap.nullable().optional(),
        musicTracks: z.record(z.string(), z.boolean()).nullable().optional(),
        totalLevel: z.union([z.number(), z.string()]).nullable(),
      }),
    )
    .returns(z.boolean()),
});

export type CustomItem = z.infer<typeof CustomItem>;

export const Item = z.union([
  BaseItem,
  CollectionLogItem,
  CombatAchievementItem,
  QuestItem,
  CustomItem,
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

export function isCustomItem(item: unknown): item is CustomItem {
  return CustomItem.safeParse(item).success;
}

export const ItemCategoryMap = z
  .record(z.string(), ItemCategory)
  .transform(async (categories) => {
    const queriedItems = Object.values(categories)
      .flatMap(({ items }) => items)
      .filter(isCollectionLogItem)
      .reduce((acc, { requiredItems }) => {
        requiredItems.forEach(({ clogName }) => acc.add(clogName), acc);

        return acc;
      }, new Set<CollectionLogItemName>());

    const dropRates = await fetchItemDropRates(queriedItems);

    if (!dropRates) {
      throw new Error('Failed to fetch item drop rates');
    }

    return Object.entries(categories).reduce(
      (acc, [categoryName, { items, image }]) => {
        acc[categoryName] = ItemCategory.parse({
          image,
          items: items.map((item) => ({
            ...item,
            ...(!item.points &&
              isCollectionLogItem(item) && {
                points: calculateItemPoints(dropRates, item.requiredItems),
              }),
          })),
        });

        return acc;
      },
      {} as Record<string, ItemCategory>,
    );
  });

export type ItemCategoryMap = z.infer<typeof ItemCategoryMap>;
