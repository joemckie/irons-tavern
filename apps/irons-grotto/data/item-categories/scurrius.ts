import { formatWikiImageUrl } from '@/app/rank-calculator/utils/format-wiki-url';
import { ItemCategory } from '@/app/schemas/items';
import { singleItem } from '../utils/item-builders';

export const scurrius: ItemCategory = {
  image: formatWikiImageUrl('Scurry_chathead', 'category'),
  items: [
    singleItem({
      name: 'Scurry',
      collectionLogCategory: 'scurrius',
    }),
  ],
};
