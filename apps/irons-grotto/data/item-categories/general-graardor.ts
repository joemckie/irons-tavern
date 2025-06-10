import { formatWikiImageUrl } from '@/app/rank-calculator/utils/format-wiki-url';
import { ItemCategory } from '@/app/schemas/items';
import { singleItem } from '../utils/item-builders';

export const generalGraardor: ItemCategory = {
  image: formatWikiImageUrl('Pet general graardor detail', 'category'),
  items: [
    singleItem({
      name: 'Bandos chestplate',
      collectionLogCategory: 'general_graardor',
      targetDropSources: ['General Graardor'],
    }),
    singleItem({
      name: 'Bandos tassets',
      collectionLogCategory: 'general_graardor',
      targetDropSources: ['General Graardor'],
    }),
    singleItem({
      name: 'Bandos boots',
      collectionLogCategory: 'general_graardor',
      targetDropSources: ['General Graardor'],
    }),
    singleItem({
      name: 'Bandos hilt',
      collectionLogCategory: 'general_graardor',
    }),
    singleItem({
      name: 'Pet general graardor',
      collectionLogCategory: 'general_graardor',
    }),
  ],
};
