import { formatWikiImageUrl } from '@/app/rank-calculator/utils/format-wiki-url';
import { ItemCategory } from '@/app/schemas/items';
import { singleItem } from '../utils/item-builders';

export const doomOfMokhaiotl: ItemCategory = {
  image: formatWikiImageUrl('Doom of Mokhaiotl', 'category'),
  items: [
    singleItem({
      name: 'Avernic treads',
      collectionLogCategory: 'doom_of_mokhaiotl',
    }),
    singleItem({
      name: 'Eye of ayak',
      clogName: 'Eye of ayak (uncharged)',
      collectionLogCategory: 'doom_of_mokhaiotl',
    }),
    singleItem({
      name: 'Mokhaiotl cloth',
      collectionLogCategory: 'doom_of_mokhaiotl',
    }),
    singleItem({
      name: 'Dom',
      collectionLogCategory: 'doom_of_mokhaiotl',
    }),
  ],
};
