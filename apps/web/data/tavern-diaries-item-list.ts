import { formatWikiImageUrl } from '@/app/rank-calculator/utils/format-wiki-url';
import {
  BaseItem,
  CollectionLogItem,
  CustomItem,
  ItemCategoryMap,
  RequiredItem,
} from '@/app/schemas/items';
import { CollectionLogItemName, SkillingPet } from '@/app/schemas/osrs';
import {
  TempleOSRSCollectionLogCategory,
  TempleOSRSCollectionLogCategoryBosses,
  TempleOSRSCollectionLogCategoryClues,
  TempleOSRSCollectionLogCategoryMinigames,
  TempleOSRSCollectionLogCategoryOther,
  TempleOSRSCollectionLogItem,
} from '@repo/templeosrs/api-schema';

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

function singleItem({
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
    Omit<RequiredItem, 'amount' | 'targetDropSources'> & { amount?: number }
  >;
};

function compoundItem({
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

type CustomItemOptions = Omit<
  OptionalKeys<
    CustomItem,
    'image' | 'points' | 'hasPointsError' | 'collectionLogCategories'
  >,
  'requiredItems'
>;

function customItem({
  name,
  image = formatWikiImageUrl(name),
}: CustomItemOptions) {
  return CustomItem.parse({
    name,
    image,
  });
}

function manualItem({
  name,
  image = formatWikiImageUrl(name),
}: Omit<OptionalKeys<BaseItem, 'image'>, 'points'>) {
  return BaseItem.parse({
    image,
    name,
    points: 0,
  });
}

export const tavernDiariesItemList = {
  'Skilling Diary - Drunkard': {
    items: [
      compoundItem({
        name: 'Graceful outfit',
        image: formatWikiImageUrl('Graceful hood'),
        collectionLogCategories: ['rooftop_agility'],
        requiredItems: [
          { clogName: 'Graceful boots' },
          { clogName: 'Graceful cape' },
          { clogName: 'Graceful gloves' },
          { clogName: 'Graceful hood' },
          { clogName: 'Graceful top' },
        ],
      }),
      compoundItem({
        name: 'Pyromancer outfit',
        image: formatWikiImageUrl('Pyromancer hood'),
        collectionLogCategories: ['wintertodt'],
        requiredItems: [
          { clogName: 'Pyromancer hood' },
          { clogName: 'Pyromancer robe' },
          { clogName: 'Pyromancer garb' },
          { clogName: 'Pyromancer boots' },
        ],
      }),
      compoundItem({
        name: "Angler's outfit",
        image: formatWikiImageUrl('Angler hat'),
        collectionLogCategories: ['fishing_trawler'],
        requiredItems: [
          { clogName: 'Angler boots' },
          { clogName: 'Angler top' },
          { clogName: 'Angler waders' },
          { clogName: 'Angler hat' },
        ],
      }),
      customItem({
        name: 'Prospector kit',
        isAcquired({ collectionLogItemMap, achievementDiaryMap }) {
          const items = [
            'Prospector boots',
            'Prospector helmet',
            'Prospector legs',
          ] satisfies CollectionLogItemName[];

          const hasRequiredPieces = items.every(
            (item) => collectionLogItemMap[item],
          );

          const hasJacketOrEliteDiary =
            collectionLogItemMap['prospector jacket'] >= 0 ||
            achievementDiaryMap.Varrock === 'Elite';

          return hasRequiredPieces && hasJacketOrEliteDiary;
        },
      }),
      compoundItem({
        name: 'Lumberjack outfit',
        image: formatWikiImageUrl('Lumberjack hat'),
        collectionLogCategories: ['forestry'],
        requiredItems: [
          { clogName: 'Lumberjack hat' },
          { clogName: 'Lumberjack top' },
          { clogName: 'Lumberjack legs' },
          { clogName: 'Lumberjack boots' },
        ],
      }),
      compoundItem({
        name: 'Rogue outfit',
        image: formatWikiImageUrl('Rogue mask'),
        collectionLogCategories: ['rogues_den'],
        requiredItems: [
          { clogName: 'Rogue mask' },
          { clogName: 'Rogue top' },
          { clogName: 'Rogue trousers' },
          { clogName: 'Rogue gloves' },
          { clogName: 'Rogue boots' },
        ],
      }),
      singleItem({
        name: 'Mining gloves',
        collectionLogCategory: 'miscellaneous',
      }),
      customItem({
        name: '1,350 non-combat virtual total level',
        isAcquired({
          levelMap: {
            Hitpoints,
            Attack,
            Strength,
            Defence,
            Ranged,
            Magic,
            Slayer,
            ...levels
          },
        }) {
          return (
            Object.values(levels).reduce((acc, level) => acc + level, 0) >= 1350
          );
        },
      }),
      customItem({
        name: 'One level 100 non-combat skill',
        isAcquired({
          levelMap: {
            Hitpoints,
            Attack,
            Strength,
            Defence,
            Ranged,
            Magic,
            Slayer,
            ...levels
          },
        }) {
          return Object.values(levels).some((level) => level >= 100);
        },
      }),
    ],
  },
  'Skilling Diary - Bartender': {
    items: [
      compoundItem({
        name: "Carpenter's outfit",
        image: formatWikiImageUrl("Carpenter's hat"),
        collectionLogCategories: ['mahogany_homes'],
        requiredItems: [
          { clogName: "Carpenter's boots" },
          { clogName: "Carpenter's helmet" },
          { clogName: "Carpenter's shirt" },
          { clogName: "Carpenter's trousers" },
        ],
      }),
      compoundItem({
        name: "Farmer's outfit",
        image: formatWikiImageUrl("Farmer's hat"),
        collectionLogCategories: ['tithe_farm'],
        requiredItems: [
          { clogName: "Farmer's boots" },
          { clogName: "Farmer's boro trousers" },
          { clogName: "Farmer's jacket" },
          { clogName: "Farmer's strawhat" },
        ],
      }),
      compoundItem({
        name: 'Guild Hunter outfit',
        image: formatWikiImageUrl("Carpenter's hat"),
        collectionLogCategories: ['hunter_guild'],
        requiredItems: [
          { clogName: 'Guild hunter boots' },
          { clogName: 'Guild hunter headwear' },
          { clogName: 'Guild hunter legs' },
          { clogName: 'Guild hunter top' },
        ],
      }),
      customItem({
        name: 'Golden prospector kit',
        isAcquired({ collectionLogItemMap, achievementDiaryMap }) {
          const items = [
            'Prospector boots',
            'Prospector helmet',
            'Prospector legs',
          ] satisfies CollectionLogItemName[];

          const hasRequiredPieces = items.every(
            (item) => collectionLogItemMap[item],
          );

          const hasJacketOrEliteDiary =
            achievementDiaryMap.Varrock === 'Elite'
              ? collectionLogItemMap['star fragment'] >= 3
              : collectionLogItemMap['prospector jacket'] >= 0 &&
                collectionLogItemMap['star fragment'] >= 4;

          return hasRequiredPieces && hasJacketOrEliteDiary;
        },
      }),
      compoundItem({
        name: 'Raiments of the Eye',
        image: formatWikiImageUrl("Carpenter's hat"),
        collectionLogCategories: ['guardians_of_the_rift'],
        requiredItems: [
          { clogName: 'Hat of the eye' },
          { clogName: 'Robe top of the eye' },
          { clogName: 'Robe bottoms of the eye' },
          { clogName: 'Boots of the eye' },
        ],
      }),
      compoundItem({
        name: 'Forestry outfit',
        image: formatWikiImageUrl("Carpenter's hat"),
        collectionLogCategories: ['forestry'],
        requiredItems: [
          { clogName: 'Forestry boots' },
          { clogName: 'Forestry hat' },
          { clogName: 'Forestry legs' },
          { clogName: 'Forestry top' },
        ],
      }),
      singleItem({
        name: 'Superior mining gloves',
        collectionLogCategory: 'miscellaneous',
      }),
      customItem({
        name: '1,450 non-combat virtual total level',
        isAcquired({
          levelMap: {
            Hitpoints,
            Attack,
            Strength,
            Defence,
            Ranged,
            Magic,
            Slayer,
            ...levels
          },
        }) {
          return (
            Object.values(levels).reduce((acc, level) => acc + level, 0) >= 1450
          );
        },
      }),
      customItem({
        name: 'One level 105 non-combat skill',
        isAcquired({
          levelMap: {
            Hitpoints,
            Attack,
            Strength,
            Defence,
            Ranged,
            Magic,
            Slayer,
            ...levels
          },
        }) {
          return Object.values(levels).some((level) => level >= 110);
        },
      }),
      customItem({
        name: '1 Skilling pet',
        collectionLogCategories: ['all_pets'],
        isAcquired({ collectionLogItemMap }) {
          const acquiredSkillingPets = SkillingPet.options.reduce(
            (acc, pet) => acc + Number(collectionLogItemMap[pet]),
            0,
          );

          return acquiredSkillingPets >= 1;
        },
      }),
    ],
  },
  'Skilling Diary - Landlord': {
    items: [
      compoundItem({
        name: 'Spirit angler outfit',
        image: formatWikiImageUrl("Carpenter's hat"),
        collectionLogCategories: ['tempoross'],
        requiredItems: [
          { clogName: 'Spirit angler boots' },
          { clogName: 'Spirit angler headband' },
          { clogName: 'Spirit angler top' },
          { clogName: 'Spirit angler waders' },
        ],
      }),
      customItem({
        name: 'Dyed Raiments of the Eye',
        collectionLogCategories: ['guardians_of_the_rift'],
        isAcquired({ collectionLogItemMap }) {
          const setPieces = [
            'Hat of the eye',
            'Boots of the eye',
            'Robe top of the eye',
            'Robe bottoms of the eye',
          ] satisfies CollectionLogItemName[];

          const dyeVariants = [
            'Abyssal red dye',
            'Abyssal blue dye',
            'Abyssal green dye',
          ] satisfies CollectionLogItemName[];

          const hasAllSetPieces = setPieces.every(
            (piece) => collectionLogItemMap[piece],
          );

          const dyeCount = dyeVariants.reduce(
            (acc, dye) => acc + collectionLogItemMap[dye],
            0,
          );

          return hasAllSetPieces && dyeCount >= 3;
        },
      }),
      compoundItem({
        name: 'Smiths uniform',
        image: formatWikiImageUrl("Carpenter's hat"),
        collectionLogCategories: ['giants_foundry'],
        requiredItems: [
          { clogName: 'Smiths boots' },
          { clogName: 'Smiths gloves' },
          { clogName: 'Smiths trousers' },
          { clogName: 'Smiths tunic' },
        ],
      }),
      singleItem({
        name: 'Expert mining gloves',
        collectionLogCategory: 'miscellaneous',
      }),
      singleItem({
        name: 'Ring of endurance',
        clogName: 'Ring of endurance (uncharged)',
        collectionLogCategory: 'hallowed_sepulchre',
      }),
      singleItem({
        name: 'Crystal tool',
        clogName: 'Crystal tool seed',
        collectionLogCategory: 'zalcano',
      }),
      manualItem({
        name: '6:45 Sepulchre',
      }),
      customItem({
        name: '1,525 non-combat virtual total level',
        isAcquired({
          levelMap: {
            Hitpoints,
            Attack,
            Strength,
            Defence,
            Ranged,
            Magic,
            Slayer,
            ...levels
          },
        }) {
          return (
            Object.values(levels).reduce((acc, level) => acc + level, 0) >= 1525
          );
        },
      }),
      customItem({
        name: 'One level 110 non-combat skill',
        isAcquired({
          levelMap: {
            Hitpoints,
            Attack,
            Strength,
            Defence,
            Ranged,
            Magic,
            Slayer,
            ...levels
          },
        }) {
          return Object.values(levels).some((level) => level >= 110);
        },
      }),
      customItem({
        name: '3 skilling pets',
        collectionLogCategories: ['all_pets'],
        isAcquired({ collectionLogItemMap }) {
          const acquiredSkillingPets = SkillingPet.options.reduce(
            (acc, pet) => acc + Number(collectionLogItemMap[pet]),
            0,
          );

          return acquiredSkillingPets >= 3;
        },
      }),
    ],
  },
  'Skilling Diary - Baron': {
    items: [
      customItem({
        name: 'All dyed Raiments of the Eye',
        collectionLogCategories: ['guardians_of_the_rift'],
        isAcquired({ collectionLogItemMap }) {
          const setPieces = [
            'Hat of the eye',
            'Boots of the eye',
            'Robe top of the eye',
            'Robe bottoms of the eye',
          ] satisfies CollectionLogItemName[];

          const dyeVariants = [
            'Abyssal red dye',
            'Abyssal blue dye',
            'Abyssal green dye',
          ] satisfies CollectionLogItemName[];

          const hasAllSetPieces = setPieces.every(
            (piece) => collectionLogItemMap[piece] >= 3,
          );

          const dyeCount = dyeVariants.reduce(
            (acc, dye) => acc + collectionLogItemMap[dye],
            0,
          );

          return hasAllSetPieces && dyeCount >= 12;
        },
      }),
      compoundItem({
        name: "Zealot's robes",
        image: formatWikiImageUrl("Carpenter's hat"),
        collectionLogCategories: ['shades_of_mortton'],
        requiredItems: [
          { clogName: "Zealot's boots" },
          { clogName: "Zealot's helm" },
          { clogName: "Zealot's robe bottom" },
          { clogName: "Zealot's robe top" },
        ],
      }),
      singleItem({
        name: 'Golden tench',
        collectionLogCategory: 'aerial_fishing',
      }),
      singleItem({
        name: 'All crystal tools',
        clogName: 'Crystal tool seed',
        collectionLogCategory: 'zalcano',
        requiredAmount: 3,
      }),
      manualItem({
        name: '6:20 Sepulchre',
      }),
      customItem({
        name: '1,600 non-combat virtual total level',
        isAcquired({
          levelMap: {
            Hitpoints,
            Attack,
            Strength,
            Defence,
            Ranged,
            Magic,
            Slayer,
            ...levels
          },
        }) {
          return (
            Object.values(levels).reduce((acc, level) => acc + level, 0) >= 1600
          );
        },
      }),
      customItem({
        name: 'One level 115 non-combat skill',
        isAcquired({
          levelMap: {
            Hitpoints,
            Attack,
            Strength,
            Defence,
            Ranged,
            Magic,
            Slayer,
            ...levels
          },
        }) {
          return Object.values(levels).some((level) => level >= 115);
        },
      }),
      customItem({
        name: '6 skilling pets',
        collectionLogCategories: ['all_pets'],
        isAcquired({ collectionLogItemMap }) {
          const acquiredSkillingPets = SkillingPet.options.reduce(
            (acc, pet) => acc + Number(collectionLogItemMap[pet]),
            0,
          );

          return acquiredSkillingPets >= 6;
        },
      }),
    ],
  },
  'Skilling Diary - Duke': {
    items: [
      manualItem({
        name: '6:00 Sepulchre',
      }),
      customItem({
        name: '1,650 non-combat virtual total level',
        isAcquired({
          levelMap: {
            Hitpoints,
            Attack,
            Strength,
            Defence,
            Ranged,
            Magic,
            Slayer,
            ...levels
          },
        }) {
          return (
            Object.values(levels).reduce((acc, level) => acc + level, 0) >= 1650
          );
        },
      }),
      customItem({
        name: 'One level 120 non-combat skill',
        isAcquired({
          levelMap: {
            Hitpoints,
            Attack,
            Strength,
            Defence,
            Ranged,
            Magic,
            Slayer,
            ...levels
          },
        }) {
          return Object.values(levels).some((level) => level >= 120);
        },
      }),
      singleItem({
        name: 'Fish sack',
        collectionLogCategory: 'aerial_fishing',
      }),
      customItem({
        name: '10 skilling pets',
        collectionLogCategories: ['all_pets'],
        isAcquired({ collectionLogItemMap }) {
          const acquiredSkillingPets = SkillingPet.options.reduce(
            (acc, pet) => acc + Number(collectionLogItemMap[pet]),
            0,
          );

          return acquiredSkillingPets >= 10;
        },
      }),
    ],
  },
  'Collection Log - Drunkard': {
    items: [
      customItem({
        name: '200 Clue collection logs',
        isAcquired({ playerCollectionLog }) {
          const totalClueLogs = TempleOSRSCollectionLogCategoryClues.options
            .reduce<
              TempleOSRSCollectionLogItem[]
            >((acc, category) => acc.concat(playerCollectionLog.items[category] ?? []), [])
            .reduce((acc, item) => acc + Number(!!item.count), 0);

          return totalClueLogs >= 200;
        },
      }),
      customItem({
        name: '2 green logs under "Bosses"',
        isAcquired({ playerCollectionLog }) {
          const totalBossGreenLogs =
            TempleOSRSCollectionLogCategoryBosses.options.reduce(
              (acc, category) => {
                const isGreenLog = playerCollectionLog.items[category]?.every(
                  ({ count }) => count > 0,
                );

                return acc + Number(isGreenLog);
              },
              0,
            );

          return totalBossGreenLogs >= 2;
        },
      }),
      customItem({
        name: '2 green logs under "Minigames"',
        isAcquired({ playerCollectionLog }) {
          const totalMinigamesGreenLogs =
            TempleOSRSCollectionLogCategoryMinigames.options.reduce(
              (acc, category) => {
                const isGreenLog = playerCollectionLog.items[category]?.every(
                  ({ count }) => count > 0,
                );

                return acc + Number(isGreenLog);
              },
              0,
            );

          return totalMinigamesGreenLogs >= 2;
        },
      }),
      customItem({
        name: '4 green logs under "Other"',
        isAcquired({ playerCollectionLog }) {
          const totalOtherGreenLogs =
            TempleOSRSCollectionLogCategoryOther.options.reduce(
              (acc, category) => {
                const isGreenLog = playerCollectionLog.items[category]?.every(
                  ({ count }) => count > 0,
                );

                return acc + Number(isGreenLog);
              },
              0,
            );

          return totalOtherGreenLogs >= 4;
        },
      }),
      customItem({
        name: 'Black Staff of Collection (700+)',
        isAcquired({ playerCollectionLog }) {
          return playerCollectionLog.total_collections_finished >= 700;
        },
      }),
    ],
  },
  'Collection Log - Bartender': {
    items: [
      customItem({
        name: '300 Clue collection logs',
        isAcquired({ playerCollectionLog }) {
          const totalClueLogs = TempleOSRSCollectionLogCategoryClues.options
            .reduce<
              TempleOSRSCollectionLogItem[]
            >((acc, category) => acc.concat(playerCollectionLog.items[category] ?? []), [])
            .reduce((acc, item) => acc + Number(!!item.count), 0);

          return totalClueLogs >= 300;
        },
      }),
      customItem({
        name: 'Green log Shared Clue Rewards',
        isAcquired({ playerCollectionLog }) {
          return (
            playerCollectionLog.items.shared_treasure_trail_rewards?.every(
              ({ count }) => count > 0,
            ) ?? false
          );
        },
      }),
      customItem({
        name: 'Green log Beginner Clues',
        isAcquired({ playerCollectionLog }) {
          return (
            playerCollectionLog.items.beginner_treasure_trails?.every(
              ({ count }) => count > 0,
            ) ?? false
          );
        },
      }),
      customItem({
        name: '5 green logs under "Bosses"',
        isAcquired({ playerCollectionLog }) {
          const totalBossesGreenLogs =
            TempleOSRSCollectionLogCategoryBosses.options.reduce(
              (acc, category) => {
                const isGreenLog = playerCollectionLog.items[category]?.every(
                  ({ count }) => count > 0,
                );

                return acc + Number(isGreenLog);
              },
              0,
            );

          return totalBossesGreenLogs >= 5;
        },
      }),
      customItem({
        name: '4 green logs under "Minigames"',
        isAcquired({ playerCollectionLog }) {
          const totalMinigamesGreenLogs =
            TempleOSRSCollectionLogCategoryMinigames.options.reduce(
              (acc, category) => {
                const isGreenLog = playerCollectionLog.items[category]?.every(
                  ({ count }) => count > 0,
                );

                return acc + Number(isGreenLog);
              },
              0,
            );

          return totalMinigamesGreenLogs >= 4;
        },
      }),
      customItem({
        name: '8 green logs under "Other"',
        isAcquired({ playerCollectionLog }) {
          const totalOtherGreenLogs =
            TempleOSRSCollectionLogCategoryOther.options.reduce(
              (acc, category) => {
                const isGreenLog = playerCollectionLog.items[category]?.every(
                  ({ count }) => count > 0,
                );

                return acc + Number(isGreenLog);
              },
              0,
            );

          return totalOtherGreenLogs >= 8;
        },
      }),
      customItem({
        name: 'Adamant Staff of Collection (1k+)',
        isAcquired({ playerCollectionLog }) {
          return playerCollectionLog.total_collections_finished >= 1000;
        },
      }),
    ],
  },
  'Collection Log - Landlord': {
    items: [
      customItem({
        name: '400 Clue collection logs',
        isAcquired({ playerCollectionLog }) {
          const totalClueLogs = TempleOSRSCollectionLogCategoryClues.options
            .reduce<
              TempleOSRSCollectionLogItem[]
            >((acc, category) => acc.concat(playerCollectionLog.items[category] ?? []), [])
            .reduce((acc, item) => acc + Number(!!item.count), 0);

          return totalClueLogs >= 400;
        },
      }),
      customItem({
        name: 'Any gilded item',
        isAcquired({ playerCollectionLog }) {
          return (
            playerCollectionLog.items.gilded?.some(({ count }) => count > 0) ??
            false
          );
        },
      }),
      singleItem({
        name: "Champion's cape",
        collectionLogCategory: 'champions_challenge',
      }),
      customItem({
        name: '12 green logs under "Bosses"',
        isAcquired({ playerCollectionLog }) {
          const totalBossesGreenLogs =
            TempleOSRSCollectionLogCategoryBosses.options.reduce(
              (acc, category) => {
                const isGreenLog = playerCollectionLog.items[category]?.every(
                  ({ count }) => count > 0,
                );

                return acc + Number(isGreenLog);
              },
              0,
            );

          return totalBossesGreenLogs >= 12;
        },
      }),
      customItem({
        name: '7 green logs under "Minigames"',
        isAcquired({ playerCollectionLog }) {
          const totalMinigamesGreenLogs =
            TempleOSRSCollectionLogCategoryMinigames.options.reduce(
              (acc, category) => {
                const isGreenLog = playerCollectionLog.items[category]?.every(
                  ({ count }) => count > 0,
                );

                return acc + Number(isGreenLog);
              },
              0,
            );

          return totalMinigamesGreenLogs >= 7;
        },
      }),
      customItem({
        name: '12 green logs under "Other"',
        isAcquired({ playerCollectionLog }) {
          const totalOtherGreenLogs =
            TempleOSRSCollectionLogCategoryOther.options.reduce(
              (acc, category) => {
                const isGreenLog = playerCollectionLog.items[category]?.every(
                  ({ count }) => count > 0,
                );

                return acc + Number(isGreenLog);
              },
              0,
            );

          return totalOtherGreenLogs >= 12;
        },
      }),
      customItem({
        name: 'Rune Staff of Collection (1.1k+)',
        isAcquired({ playerCollectionLog }) {
          return playerCollectionLog.total_collections_finished >= 1100;
        },
      }),
    ],
  },
  'Collection Log - Baron': {
    items: [
      customItem({
        name: '475 Clue collection logs',
        isAcquired({ playerCollectionLog }) {
          const totalClueLogs = TempleOSRSCollectionLogCategoryClues.options
            .reduce<
              TempleOSRSCollectionLogItem[]
            >((acc, category) => acc.concat(playerCollectionLog.items[category] ?? []), [])
            .reduce((acc, item) => acc + Number(!!item.count), 0);

          return totalClueLogs >= 475;
        },
      }),
      customItem({
        name: 'Any 3 unique gilded items',
        isAcquired({ playerCollectionLog }) {
          return (
            (playerCollectionLog.items.gilded ?? []).reduce(
              (acc, { count }) => acc + Number(count > 0),
              0,
            ) >= 3
          );
        },
      }),
      customItem({
        name: 'Metamorphic or Sanguine Dust',
        isAcquired({ collectionLogItemMap }) {
          const items = [
            'Metamorphic dust',
            'Sanguine dust',
          ] satisfies CollectionLogItemName[];

          return items.some((item) => collectionLogItemMap[item]);
        },
      }),
      customItem({
        name: 'Expert Dragon Archer Chompy Hat',
        isAcquired({ playerCollectionLog }) {
          const totalChompyHats = 18;

          return (
            playerCollectionLog.items.chompy_bird_hunting?.reduce(
              (acc, { name, count }) => {
                if (name !== 'Chompy bird hat') {
                  return acc;
                }

                return acc + Number(!!count);
              },
              0,
            ) === totalChompyHats
          );
        },
      }),
      customItem({
        name: '16 green logs under "Bosses"',
        isAcquired({ playerCollectionLog }) {
          const totalBossesGreenLogs =
            TempleOSRSCollectionLogCategoryBosses.options.reduce(
              (acc, category) => {
                const isGreenLog = playerCollectionLog.items[category]?.every(
                  ({ count }) => count > 0,
                );

                return acc + Number(isGreenLog);
              },
              0,
            );

          return totalBossesGreenLogs >= 16;
        },
      }),
      customItem({
        name: '10 green logs under "Minigames"',
        isAcquired({ playerCollectionLog }) {
          const totalMinigamesGreenLogs =
            TempleOSRSCollectionLogCategoryMinigames.options.reduce(
              (acc, category) => {
                const isGreenLog = playerCollectionLog.items[category]?.every(
                  ({ count }) => count > 0,
                );

                return acc + Number(isGreenLog);
              },
              0,
            );

          return totalMinigamesGreenLogs >= 10;
        },
      }),
      customItem({
        name: '16 green logs under "Other"',
        isAcquired({ playerCollectionLog }) {
          const totalOtherGreenLogs =
            TempleOSRSCollectionLogCategoryOther.options.reduce(
              (acc, category) => {
                const isGreenLog = playerCollectionLog.items[category]?.every(
                  ({ count }) => count > 0,
                );

                return acc + Number(isGreenLog);
              },
              0,
            );

          return totalOtherGreenLogs >= 16;
        },
      }),
      customItem({
        name: 'Dragon Staff of Collection (1.2k+)',
        isAcquired({ playerCollectionLog }) {
          return playerCollectionLog.total_collections_finished >= 1200;
        },
      }),
    ],
  },
  'Collection Log - Duke': {
    items: [
      customItem({
        name: '525 Clue collection logs',
        isAcquired({ playerCollectionLog }) {
          const totalClueLogs = TempleOSRSCollectionLogCategoryClues.options
            .reduce<
              TempleOSRSCollectionLogItem[]
            >((acc, category) => acc.concat(playerCollectionLog.items[category] ?? []), [])
            .reduce((acc, item) => acc + Number(!!item.count), 0);

          return totalClueLogs >= 525;
        },
      }),
      customItem({
        name: 'Any 5 unique gilded items',
        isAcquired({ playerCollectionLog }) {
          return (
            (playerCollectionLog.items.gilded ?? []).reduce(
              (acc, { count }) => acc + Number(count > 0),
              0,
            ) >= 5
          );
        },
      }),
      customItem({
        name: 'Any piece of 3rd Age',
        isAcquired({ playerCollectionLog }) {
          return (
            playerCollectionLog.items.third_age?.some(
              (val) => val.count >= 0,
            ) ?? false
          );
        },
      }),
      singleItem({
        name: 'Amulet of eternal glory',
        collectionLogCategory: 'miscellaneous',
      }),
      customItem({
        name: 'Any piece of Dragonstone Armour',
        isAcquired({ collectionLogItemMap }) {
          const dragonstoneArmourPieces = [
            'Dragonstone boots',
            'Dragonstone full helm',
            'Dragonstone gauntlets',
            'Dragonstone platebody',
            'Dragonstone platelegs',
          ] satisfies CollectionLogItemName[];

          return dragonstoneArmourPieces.some(
            (item) => collectionLogItemMap[item],
          );
        },
      }),
      customItem({
        name: 'Dragon metal lump or slice',
        isAcquired({ collectionLogItemMap }) {
          const items = [
            'Dragon metal lump',
            'Dragon metal slice',
          ] satisfies CollectionLogItemName[];

          return items.some((item) => collectionLogItemMap[item]);
        },
      }),
      customItem({
        name: 'Green log Chambers of Xeric',
        isAcquired({ playerCollectionLog }) {
          return (
            playerCollectionLog.items.chambers_of_xeric?.every(
              (item) => item.count >= 0,
            ) ?? false
          );
        },
      }),
      customItem({
        name: 'Gilded Staff of Collection (1.4k+)',
        isAcquired({ playerCollectionLog }) {
          return playerCollectionLog.total_collections_finished >= 1400;
        },
      }),
    ],
  },
} satisfies ItemCategoryMap;
