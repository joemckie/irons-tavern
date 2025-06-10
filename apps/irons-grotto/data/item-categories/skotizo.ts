import { formatWikiImageUrl } from '@/app/rank-calculator/utils/format-wiki-url';
import { ItemCategory } from '@/app/schemas/items';
import { singleItem } from '../utils/item-builders';

export const skotizo: ItemCategory = {
  image: formatWikiImageUrl('Skotos_detail', 'category'),
  items: [
    singleItem({
      name: 'Jar of darkness',
      collectionLogCategory: 'skotizo',
    }),
    singleItem({
      name: 'Skotos',
      collectionLogCategory: 'skotizo',
    }),
  ],
};
