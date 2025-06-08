import { formatWikiImageUrl } from '@/app/rank-calculator/utils/format-wiki-url';
import { ItemCategory } from '@/app/schemas/items';
import { singleItem } from '../utils/item-builders';

export const chaosElemental: ItemCategory = {
  image: formatWikiImageUrl('Pet chaos elemental detail', 'category'),
  items: [
    singleItem({
      name: 'Pet chaos elemental',
      collectionLogCategory: 'chaos_elemental',
    }),
  ],
};
