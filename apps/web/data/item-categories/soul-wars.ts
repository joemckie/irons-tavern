import { formatWikiImageUrl } from '@/app/rank-calculator/utils/format-wiki-url';
import { ItemCategory } from '@/app/schemas/items';
import { singleItem } from '../utils/item-builders';

export const soulWars: ItemCategory = {
  image: formatWikiImageUrl("Lil' Creator chathead", 'category'),
  items: [
    singleItem({
      name: "Lil' creator",
      collectionLogCategory: 'soul_wars',
    }),
  ],
};
