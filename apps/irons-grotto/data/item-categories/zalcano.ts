import { formatWikiImageUrl } from '@/app/rank-calculator/utils/format-wiki-url';
import { ItemCategory } from '@/app/schemas/items';
import { singleItem } from '../utils/item-builders';

export const zalcano: ItemCategory = {
  image: formatWikiImageUrl('Smolcano_chathead', 'category'),
  items: [
    singleItem({
      name: 'Smolcano',
      collectionLogCategory: 'zalcano',
    }),
    singleItem({
      name: 'Crystal tool seed',
      collectionLogCategory: 'zalcano',
    }),
  ],
};
