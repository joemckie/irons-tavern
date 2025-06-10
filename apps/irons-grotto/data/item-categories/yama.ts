import { formatWikiImageUrl } from '@/app/rank-calculator/utils/format-wiki-url';
import { ItemCategory } from '@/app/schemas/items';
import { singleItem } from '../utils/item-builders';

export const yama: ItemCategory = {
  image: formatWikiImageUrl('Yami chathead', 'category'),
  items: [
    singleItem({
      name: 'Soulflame horn',
      collectionLogCategory: 'yama',
      targetDropSources: ['Yama'],
    }),
    singleItem({
      name: 'Oathplate helm',
      collectionLogCategory: 'yama',
      targetDropSources: ['Yama'],
    }),
    singleItem({
      name: 'Oathplate chest',
      collectionLogCategory: 'yama',
      targetDropSources: ['Yama'],
    }),
    singleItem({
      name: 'Oathplate legs',
      collectionLogCategory: 'yama',
      targetDropSources: ['Yama'],
    }),
    singleItem({
      name: 'Yami',
      collectionLogCategory: 'yama',
      targetDropSources: ['Yama'],
    }),
  ],
};
