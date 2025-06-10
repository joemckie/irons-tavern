import { formatWikiImageUrl } from '@/app/rank-calculator/utils/format-wiki-url';
import { ItemCategory } from '@/app/schemas/items';
import { singleItem, compoundItem } from '../utils/item-builders';

export const royalTitans: ItemCategory = {
  image: formatWikiImageUrl('Branda the Fire Queen', 'category'),
  items: [
    singleItem({
      name: 'Deadeye prayer scroll',
      image: formatWikiImageUrl('Deadeye'),
      collectionLogCategory: 'royal_titans',
    }),
    singleItem({
      name: 'Mystic vigour prayer scroll',
      image: formatWikiImageUrl('Mystic Vigour'),
      collectionLogCategory: 'royal_titans',
    }),
    compoundItem({
      name: 'Twinflame staff',
      requiredItems: [
        { clogName: 'Ice element staff crown' },
        { clogName: 'Fire element staff crown' },
      ],
      collectionLogCategories: ['royal_titans'],
    }),
    singleItem({
      name: 'Bran',
      collectionLogCategory: 'royal_titans',
    }),
  ],
};
