import { formatWikiImageUrl } from '@/app/rank-calculator/utils/format-wiki-url';
import { ItemCategory } from '@/app/schemas/items';
import { singleItem } from '../utils/item-builders';

export const callistoAndArtio: ItemCategory = {
  image: formatWikiImageUrl('Callisto cub chathead', 'category'),
  items: [
    singleItem({
      name: 'Tyrannical ring',
      collectionLogCategory: 'callisto_and_artio',
      targetDropSources: ['Artio'],
    }),
    singleItem({
      name: 'Claws of callisto',
      collectionLogCategory: 'callisto_and_artio',
      targetDropSources: ['Artio'],
    }),
    singleItem({
      name: 'Voidwaker hilt',
      collectionLogCategory: 'callisto_and_artio',
      targetDropSources: ['Artio'],
    }),
    singleItem({
      name: 'Callisto cub',
      collectionLogCategory: 'callisto_and_artio',
      targetDropSources: ['Artio'],
    }),
  ],
};
