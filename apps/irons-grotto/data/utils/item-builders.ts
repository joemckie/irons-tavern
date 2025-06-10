import { formatWikiImageUrl } from '@/app/rank-calculator/utils/format-wiki-url';
import {
  CollectionLogItem,
  RequiredItem,
  CombatAchievementItem,
  QuestItem,
  BaseItem,
} from '@/app/schemas/items';
import { CollectionLogItemName } from '@/app/schemas/osrs';
import { TempleOSRSCollectionLogCategory } from '@/app/schemas/temple-api';

type SingleItemOptions = Omit<
  OptionalKeys<CollectionLogItem, 'image' | 'points' | 'hasPointsError'>,
  'requiredItems' | 'collectionLogCategories'
> &
  Pick<
    RequiredItem,
    'ignoreAmountMultiplier' | 'ignoreDropRateModifier' | 'targetDropSources'
  > & {
    clogName?: CollectionLogItemName;
    requiredAmount?: number;
    collectionLogCategory: TempleOSRSCollectionLogCategory;
  };

export function singleItem({
  name,
  points = 0,
  clogName,
  image = formatWikiImageUrl(clogName ?? name),
  requiredAmount = 1,
  collectionLogCategory,
  targetDropSources,
  ignoreDropRateModifier,
  ignoreAmountMultiplier,
}: SingleItemOptions) {
  return CollectionLogItem.parse({
    image,
    name,
    points,
    hasPointsError: false,
    requiredItems: [
      {
        amount: requiredAmount,
        clogName: clogName ?? name,
        targetDropSources,
        ignoreDropRateModifier,
        ignoreAmountMultiplier,
      },
    ],
    collectionLogCategories: [collectionLogCategory],
  });
}

type CompoundItemOptions = Omit<
  OptionalKeys<CollectionLogItem, 'image' | 'points' | 'hasPointsError'>,
  'requiredItems'
> & {
  requiredItems: NonEmptyArray<
    Omit<RequiredItem, 'amount'> & { amount?: number }
  >;
};

export function compoundItem({
  name,
  image = formatWikiImageUrl(name),
  points = 0,
  requiredItems,
  requiredLevels,
  collectionLogCategories,
}: CompoundItemOptions) {
  return CollectionLogItem.parse({
    image,
    name,
    points,
    hasPointsError: false,
    requiredItems: requiredItems.map<RequiredItem>(
      ({ amount = 1, ...item }) => ({
        ...item,
        amount,
      }),
    ),
    requiredLevels,
    collectionLogCategories,
  });
}

export function combatAchievementItem({
  name,
  image = formatWikiImageUrl(name),
  points,
  requiredCombatAchievements,
}: OptionalKeys<CombatAchievementItem, 'image'>) {
  return CombatAchievementItem.parse({
    image,
    name,
    points,
    requiredCombatAchievements,
  });
}

export function questItem({
  name,
  image = formatWikiImageUrl(name),
  points,
  requiredQuests,
}: OptionalKeys<QuestItem, 'image'>) {
  return QuestItem.parse({
    image,
    name,
    points,
    requiredQuests,
  });
}
export function baseItem({ image, name, points }: BaseItem) {
  return BaseItem.parse({
    name,
    points,
    image,
  });
}
