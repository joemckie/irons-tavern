import { formatWikiImageUrl } from '@/app/rank-calculator/utils/format-wiki-url';
import { ItemCategory } from '@/app/schemas/items';
import { singleItem } from '../utils/item-builders';
import { calculateRaidsCapePoints } from '../utils/calculate-raids-cape-points';

export const theatreOfBlood: ItemCategory = {
  image: formatWikiImageUrl('Verzik Vitur (final form)', 'category'),
  items: [
    singleItem({
      name: 'Avernic defender hilt',
      collectionLogCategory: 'theatre_of_blood',
      targetDropSources: ['Monumental chest#Normal Mode'],
    }),
    singleItem({
      name: 'Justiciar faceguard',
      collectionLogCategory: 'theatre_of_blood',
      targetDropSources: ['Monumental chest#Normal Mode'],
    }),
    singleItem({
      name: 'Justiciar chestguard',
      collectionLogCategory: 'theatre_of_blood',
      targetDropSources: ['Monumental chest#Normal Mode'],
    }),
    singleItem({
      name: 'Justiciar legguards',
      collectionLogCategory: 'theatre_of_blood',
      targetDropSources: ['Monumental chest#Normal Mode'],
    }),
    singleItem({
      name: 'Ghrazi rapier',
      collectionLogCategory: 'theatre_of_blood',
      targetDropSources: ['Monumental chest#Normal Mode'],
    }),
    singleItem({
      name: 'Sanguinesti staff',
      clogName: 'Sanguinesti staff (uncharged)',
      collectionLogCategory: 'theatre_of_blood',
      targetDropSources: ['Monumental chest#Normal Mode'],
    }),
    singleItem({
      name: 'Scythe of Vitur',
      clogName: 'Scythe of Vitur (uncharged)',
      collectionLogCategory: 'theatre_of_blood',
      targetDropSources: ['Monumental chest#Normal Mode'],
    }),
    singleItem({
      name: 'Holy ornament kit',
      collectionLogCategory: 'theatre_of_blood',
    }),
    singleItem({
      name: 'Sanguine ornament kit',
      collectionLogCategory: 'theatre_of_blood',
    }),
    singleItem({
      name: 'Sanguine dust',
      collectionLogCategory: 'theatre_of_blood',
    }),
    singleItem({
      name: "Lil' Zik",
      collectionLogCategory: 'theatre_of_blood',
    }),
    singleItem({
      name: "Sinhaza shroud tier 1",
      collectionLogCategory: 'theatre_of_blood',
      points: calculateRaidsCapePoints(1500, 2000, 100),
    }),
    singleItem({
      name: "Sinhaza shroud tier 2",
      collectionLogCategory: 'theatre_of_blood',
      points: calculateRaidsCapePoints(1500, 2000, 400),
    }),
    singleItem({
      name: "Sinhaza shroud tier 3",
      collectionLogCategory: 'theatre_of_blood',
      points: calculateRaidsCapePoints(1500, 2000, 500),
    }),
    singleItem({
      name: "Sinhaza shroud tier 4",
      collectionLogCategory: 'theatre_of_blood',
      points: calculateRaidsCapePoints(1500, 2000, 500),
    }),
    singleItem({
      name: "Sinhaza shroud tier 5",
      collectionLogCategory: 'theatre_of_blood',
      points: calculateRaidsCapePoints(1500, 2000, 500),
    }),
  ],
};
