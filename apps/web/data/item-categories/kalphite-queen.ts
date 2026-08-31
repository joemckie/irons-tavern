import { ItemCategory } from '@/app/schemas/items';
import { singleItem } from '../utils/item-builders';

export const kalphiteQueen: ItemCategory = {
  items: [
    singleItem({
      name: 'Kalphite Princess',
      collectionLogCategory: 'kalphite_queen',
    }),
    singleItem({
      name: 'Jar of Sand',
      collectionLogCategory: 'kalphite_queen',
    }),
  ],
};
