import { formatWikiImageUrl } from '@/app/rank-calculator/utils/format-wiki-url';
import { ItemCategory } from '@/app/schemas/items';
import { singleItem } from '../utils/item-builders';

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
      name: 'Scythe of vitur',
      clogName: 'Scythe of vitur (uncharged)',
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
      name: "Lil' zik",
      collectionLogCategory: 'theatre_of_blood',
    }),
  ],
};
