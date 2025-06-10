import {
  estimatedHoursToAcquireMageArena2Cape,
  eternalGloryDropRate,
  gloriesChargedPerHour,
} from '@/app/rank-calculator/config/efficiency-rates';
import { calculateXpOrTimeBasedItemPoints } from '@/app/rank-calculator/utils/calculate-xp-or-time-based-item-points';
import { formatWikiImageUrl } from '@/app/rank-calculator/utils/format-wiki-url';
import { ItemCategory } from '@/app/schemas/items';
import { questItem, compoundItem, singleItem } from '../utils/item-builders';

export const miscellaneousWildernessItems: ItemCategory = {
  image:
    'https://oldschool.runescape.wiki/images/Pkskull_%28Steam_Emoticon%29.png',
  items: [
    questItem({
      name: 'Mage Arena 2 cape',
      points: calculateXpOrTimeBasedItemPoints(
        estimatedHoursToAcquireMageArena2Cape,
      ),
      image: formatWikiImageUrl('Imbued zamorak cape'),
      requiredQuests: ['Mage Arena II'],
    }),
    compoundItem({
      name: 'Odium ward',
      requiredItems: [
        { clogName: 'Odium shard 1' },
        { clogName: 'Odium shard 2' },
        { clogName: 'Odium shard 3' },
      ],
      collectionLogCategories: [
        'crazy_archaeologist',
        'scorpia',
        'chaos_fanatic',
      ],
    }),
    compoundItem({
      name: 'Malediction ward',
      requiredItems: [
        { clogName: 'Malediction shard 1' },
        { clogName: 'Malediction shard 2' },
        { clogName: 'Malediction shard 3' },
      ],
      collectionLogCategories: [
        'crazy_archaeologist',
        'scorpia',
        'chaos_fanatic',
      ],
    }),
    singleItem({
      name: 'Dragon pickaxe',
      collectionLogCategory: 'venenatis_and_spindel',
      targetDropSources: ['Artio', 'Spindel', "Calvar'ion"],
    }),
    singleItem({
      name: 'Amulet of eternal glory',
      collectionLogCategory: 'miscellaneous',
      points: calculateXpOrTimeBasedItemPoints(
        1 / eternalGloryDropRate,
        gloriesChargedPerHour,
      ),
    }),
    singleItem({
      name: 'Teleport anchoring scroll',
      collectionLogCategory: 'slayer',
      targetDropSources: ["Zombie Pirate's Locker"],
    }),
  ],
};
