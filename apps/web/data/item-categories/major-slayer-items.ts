import {
  estimatedHoursToObtainAbyssalWhip,
  estimatedHoursForImbuedHeart,
} from '@/app/rank-calculator/config/efficiency-rates';
import { calculateXpOrTimeBasedItemPoints } from '@/app/rank-calculator/utils/calculate-xp-or-time-based-item-points';
import { formatWikiImageUrl } from '@/app/rank-calculator/utils/format-wiki-url';
import { ItemCategory } from '@/app/schemas/items';
import { singleItem, compoundItem } from '../utils/item-builders';

export const majorSlayerItems: ItemCategory = {
  image: formatWikiImageUrl('Slayer icon (detail)', 'category'),
  items: [
    singleItem({
      name: 'Black mask',
      collectionLogCategory: 'slayer',
      clogName: 'Black mask (10)',
      targetDropSources: ['Cave horror'],
    }),
    singleItem({
      name: 'Leaf-bladed battleaxe',
      collectionLogCategory: 'slayer',
      targetDropSources: ['Kurask'],
    }),
    singleItem({
      name: 'Warped sceptre',
      clogName: 'Warped sceptre (uncharged)',
      collectionLogCategory: 'slayer',
      targetDropSources: ['Warped Terrorbird'],
    }),
    compoundItem({
      name: 'Devout boots',
      requiredItems: [
        {
          clogName: "Drake's tooth",
          targetDropSources: ['Drake'],
        },
        { clogName: 'Holy sandals' },
      ],
      collectionLogCategories: ['slayer', 'medium_treasure_trails'],
    }),
    singleItem({
      name: 'Boots of brimstone',
      clogName: "Drake's claw",
      image: formatWikiImageUrl('Boots of brimstone'),
      collectionLogCategory: 'slayer',
      targetDropSources: ['Drake'],
    }),
    singleItem({
      name: 'Neitiznot faceguard',
      clogName: 'Basilisk jaw',
      image: formatWikiImageUrl('Neitiznot faceguard'),
      collectionLogCategory: 'slayer',
      targetDropSources: ['Basilisk Knight'],
    }),
    singleItem({
      name: 'Abyssal whip',
      collectionLogCategory: 'slayer',
      targetDropSources: ['Abyssal demon#Standard'],
      points: calculateXpOrTimeBasedItemPoints(
        estimatedHoursToObtainAbyssalWhip,
      ),
    }),
    singleItem({
      name: 'Dark bow',
      collectionLogCategory: 'slayer',
      targetDropSources: ['Dark beast'],
    }),
    singleItem({
      name: 'Mist battlestaff',
      collectionLogCategory: 'slayer',
      points: calculateXpOrTimeBasedItemPoints(
        estimatedHoursForImbuedHeart / 3.5,
      ),
    }),
    singleItem({
      name: 'Dust battlestaff',
      collectionLogCategory: 'slayer',
      points: calculateXpOrTimeBasedItemPoints(
        estimatedHoursForImbuedHeart / 3.5,
      ),
    }),
    singleItem({
      name: 'Eternal gem',
      collectionLogCategory: 'slayer',
      points: calculateXpOrTimeBasedItemPoints(estimatedHoursForImbuedHeart),
    }),
    singleItem({
      name: 'Imbued heart',
      collectionLogCategory: 'slayer',
      points: calculateXpOrTimeBasedItemPoints(estimatedHoursForImbuedHeart),
    }),
    singleItem({
      name: 'Aranea boots',
      collectionLogCategory: 'slayer',
      targetDropSources: ['Araxyte#Level 146'],
    }),
  ],
};
