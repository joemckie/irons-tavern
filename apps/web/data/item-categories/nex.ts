import { formatWikiImageUrl } from '@/app/rank-calculator/utils/format-wiki-url';
import { ItemCategory } from '@/app/schemas/items';
import { singleItem } from '../utils/item-builders';

export const nex: ItemCategory = {
  image: formatWikiImageUrl('Nexling detail', 'category'),
  items: [
    singleItem({
      name: 'Zaryte vambraces',
      collectionLogCategory: 'nex',
    }),
    singleItem({
      name: 'Nihil horn',
      collectionLogCategory: 'nex',
    }),
    singleItem({
      name: 'Torva full helm',
      clogName: 'Torva full helm (damaged)',
      image: formatWikiImageUrl('Torva full helm'),
      collectionLogCategory: 'nex',
    }),
    singleItem({
      name: 'Torva platebody',
      clogName: 'Torva platebody (damaged)',
      image: formatWikiImageUrl('Torva platebody'),
      collectionLogCategory: 'nex',
    }),
    singleItem({
      name: 'Torva platelegs',
      clogName: 'Torva platelegs (damaged)',
      image: formatWikiImageUrl('Torva platelegs'),
      collectionLogCategory: 'nex',
    }),
    singleItem({
      name: 'Ancient hilt',
      collectionLogCategory: 'nex',
    }),
    singleItem({
      name: 'Nexling',
      collectionLogCategory: 'nex',
    }),
  ],
};
