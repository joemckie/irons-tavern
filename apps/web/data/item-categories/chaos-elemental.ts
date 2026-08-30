import { formatWikiImageUrl } from '@/app/rank-calculator/utils/format-wiki-url';
import { ItemCategory } from '@/app/schemas/items';
import { singleItem } from '../utils/item-builders';

export const chaosElemental: ItemCategory = {
  image: formatWikiImageUrl('Pet Chaos Elemental detail', 'category'),
  items: [
    singleItem({
      name: 'Pet Chaos Elemental',
      collectionLogCategory: 'chaos_elemental',
    }),
  ],
};
