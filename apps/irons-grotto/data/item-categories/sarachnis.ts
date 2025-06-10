import { ItemCategory } from '@/app/schemas/items';
import { singleItem } from '../utils/item-builders';

export const sarachnis: ItemCategory = {
  items: [
    singleItem({
      name: 'Sarachnis cudgel',
      collectionLogCategory: 'sarachnis',
    }),
    singleItem({
      name: 'Jar of eyes',
      collectionLogCategory: 'sarachnis',
    }),
    singleItem({
      name: 'Sraracha',
      collectionLogCategory: 'sarachnis',
    }),
  ],
};
