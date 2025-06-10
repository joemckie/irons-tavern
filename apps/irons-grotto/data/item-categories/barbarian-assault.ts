import { formatWikiImageUrl } from '@/app/rank-calculator/utils/format-wiki-url';
import { ItemCategory } from '@/app/schemas/items';
import { singleItem } from '../utils/item-builders';

export const barbarianAssault: ItemCategory = {
  image: formatWikiImageUrl('Penance Runner (wave_4)', 'category'),
  items: [
    singleItem({
      name: 'Pet penance queen',
      collectionLogCategory: 'barbarian_assault',
    }),
  ],
};
