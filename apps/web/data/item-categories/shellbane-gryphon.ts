import { formatWikiImageUrl } from '@/app/rank-calculator/utils/format-wiki-url';
import { ItemCategory } from '@/app/schemas/items';
import { singleItem } from '../utils/item-builders';

export const shellbaneGryphon: ItemCategory = {
  image: formatWikiImageUrl('Gull (pet) chathead', 'category'),
  items: [
    singleItem({
      name: "Belle's folly",
      clogName: "Belle's folly (tarnished)",
      collectionLogCategory: 'shellbane_gryphon',
    }),
    singleItem({
      name: 'Jar of Feathers',
      collectionLogCategory: 'shellbane_gryphon',
    }),
    singleItem({
      name: 'Gull',
      image: formatWikiImageUrl('Gull (pet)'),
      collectionLogCategory: 'shellbane_gryphon',
    }),
  ],
};
