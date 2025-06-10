import { formatWikiImageUrl } from '@/app/rank-calculator/utils/format-wiki-url';
import { ItemCategory } from '@/app/schemas/items';
import { singleItem } from '../utils/item-builders';

export const cerberus: ItemCategory = {
  image: formatWikiImageUrl('Hellpuppy detail', 'category'),
  items: [
    singleItem({
      name: 'Primordial crystal',
      collectionLogCategory: 'cerberus',
    }),
    singleItem({
      name: 'Pegasian crystal',
      collectionLogCategory: 'cerberus',
    }),
    singleItem({
      name: 'Eternal crystal',
      collectionLogCategory: 'cerberus',
    }),
    singleItem({
      name: 'Smouldering stone',
      collectionLogCategory: 'cerberus',
      targetDropSources: ['Cerberus'],
    }),
    singleItem({
      name: 'Jar of souls',
      collectionLogCategory: 'cerberus',
    }),
    singleItem({
      name: 'Hellpuppy',
      collectionLogCategory: 'cerberus',
    }),
  ],
};
