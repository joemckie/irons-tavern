import { formatWikiImageUrl } from '@/app/rank-calculator/utils/format-wiki-url';
import { ItemCategory } from '@/app/schemas/items';
import { singleItem } from '../utils/item-builders';

export const chompyBirdHunting: ItemCategory = {
  image: formatWikiImageUrl('Chompy chick chathead', 'category'),
  items: [
    singleItem({
      name: 'Chompy chick',
      collectionLogCategory: 'chompy_bird_hunting',
    }),
  ],
};
