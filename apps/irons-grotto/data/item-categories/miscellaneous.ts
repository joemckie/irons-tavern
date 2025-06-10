import {
  estimatedHoursToAcquireBarrowsGloves,
  estimatedHoursToAcquireBookOfTheDead,
  estimatedHoursToObtainBottomlessCompostBucket,
  estimatedHoursToAcquireGracefulSet,
  estimatedHoursToAcquireMusicCape,
  estimatedHoursToAcquireQuestCape,
  swiftBladeLmsPointsRequired,
  ehbRates,
} from '@/app/rank-calculator/config/efficiency-rates';
import { calculateXpOrTimeBasedItemPoints } from '@/app/rank-calculator/utils/calculate-xp-or-time-based-item-points';
import { formatWikiImageUrl } from '@/app/rank-calculator/utils/format-wiki-url';
import { ItemCategory } from '@/app/schemas/items';
import { Quest } from '@/app/schemas/osrs';
import {
  questItem,
  singleItem,
  compoundItem,
  baseItem,
} from '../utils/item-builders';

export const miscellaneous: ItemCategory = {
  image: formatWikiImageUrl('Inventory', 'category'),
  items: [
    questItem({
      name: 'Barrows gloves',
      points: calculateXpOrTimeBasedItemPoints(
        estimatedHoursToAcquireBarrowsGloves,
      ),
      requiredQuests: ['Recipe for Disaster'],
    }),
    questItem({
      name: 'Book of the dead',
      points: calculateXpOrTimeBasedItemPoints(
        estimatedHoursToAcquireBookOfTheDead,
      ),
      requiredQuests: ['A Kingdom Divided'],
    }),
    singleItem({
      name: 'Bottomless compost bucket',
      collectionLogCategory: 'hespori',
      points: calculateXpOrTimeBasedItemPoints(
        estimatedHoursToObtainBottomlessCompostBucket,
      ),
    }),
    singleItem({
      name: "Bryophyta's essence",
      collectionLogCategory: 'bryophyta',
    }),

    singleItem({
      name: 'Dragon warhammer',
      collectionLogCategory: 'miscellaneous',
    }),
    compoundItem({
      name: 'Graceful set',
      points: calculateXpOrTimeBasedItemPoints(
        estimatedHoursToAcquireGracefulSet,
      ),
      image: formatWikiImageUrl('Graceful hood'),
      requiredItems: [
        { clogName: 'Graceful hood' },
        { clogName: 'Graceful top' },
        { clogName: 'Graceful legs' },
        { clogName: 'Graceful gloves' },
        { clogName: 'Graceful boots' },
        { clogName: 'Graceful cape' },
      ],
      collectionLogCategories: ['rooftop_agility'],
    }),

    baseItem({
      name: 'Music cape',
      points: calculateXpOrTimeBasedItemPoints(
        estimatedHoursToAcquireMusicCape,
      ),
      image: formatWikiImageUrl('Music cape detail'),
    }),
    questItem({
      name: 'Quest cape',
      points: calculateXpOrTimeBasedItemPoints(
        estimatedHoursToAcquireQuestCape,
      ),
      image: formatWikiImageUrl('Quest point cape detail'),
      requiredQuests: Quest.options,
    }),

    singleItem({
      name: 'Ring of endurance',
      clogName: 'Ring of endurance (uncharged)',
      collectionLogCategory: 'hallowed_sepulchre',
    }),
    singleItem({
      name: 'Swift blade',
      points: calculateXpOrTimeBasedItemPoints(
        swiftBladeLmsPointsRequired,
        ehbRates['LMS Points'],
      ),
      collectionLogCategory: 'last_man_standing',
    }),
    singleItem({
      name: 'Tome of fire',
      clogName: 'Tome of fire (empty)',
      collectionLogCategory: 'wintertodt',
    }),
    singleItem({
      name: 'Tome of water',
      clogName: 'Tome of water (empty)',
      collectionLogCategory: 'tempoross',
    }),
    singleItem({
      name: 'Zombie axe',
      clogName: 'Broken zombie axe',
      requiredLevels: {
        Smithing: 65,
      },
      collectionLogCategory: 'miscellaneous',
      targetDropSources: ["Armoured zombie (Zemouregal's Fort)"],
    }),
  ],
};
