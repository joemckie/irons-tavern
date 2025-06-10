import { formatWikiImageUrl } from '@/app/rank-calculator/utils/format-wiki-url';
import { ItemCategory } from '@/app/schemas/items';
import { singleItem } from '../utils/item-builders';

export const vorkath: ItemCategory = {
  image: formatWikiImageUrl('Vorki detail', 'category'),
  items: [
    singleItem({
      name: "Vorkath's head",
      collectionLogCategory: 'vorkath',
    }),
    singleItem({
      name: 'Dragonbone necklace',
      collectionLogCategory: 'vorkath',
    }),
    singleItem({
      name: 'Jar of decay',
      collectionLogCategory: 'vorkath',
    }),
    singleItem({
      name: 'Vorki',
      collectionLogCategory: 'vorkath',
    }),
  ],
};
