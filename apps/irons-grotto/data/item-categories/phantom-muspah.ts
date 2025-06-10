import { formatWikiImageUrl } from '@/app/rank-calculator/utils/format-wiki-url';
import { ItemCategory } from '@/app/schemas/items';
import { singleItem, compoundItem } from '../utils/item-builders';

export const phantomMuspah: ItemCategory = {
  image: formatWikiImageUrl('Phantom Muspah (shielded)', 'category'),
  items: [
    singleItem({
      name: 'Ancient sceptre',
      clogName: 'Ancient icon',
      collectionLogCategory: 'phantom_muspah',
      targetDropSources: ['Phantom Muspah'],
    }),
    compoundItem({
      name: 'Venator bow',
      requiredItems: [
        {
          clogName: 'Venator shard',
          amount: 5,
          targetDropSources: ['Phantom Muspah'],
        },
      ],
      collectionLogCategories: ['phantom_muspah'],
    }),
    singleItem({
      name: 'Muphin',
      image: formatWikiImageUrl('Muphin (shielded) chathead'),
      collectionLogCategory: 'phantom_muspah',
    }),
  ],
};
