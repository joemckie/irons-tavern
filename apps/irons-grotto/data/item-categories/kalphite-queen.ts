import { ItemCategory } from '@/app/schemas/items';
import { singleItem } from '../utils/item-builders';

export const kalphiteQueen: ItemCategory = {
  items: [
    singleItem({
      name: 'Kalphite princess',
      collectionLogCategory: 'kalphite_queen',
    }),
    singleItem({
      name: 'Jar of sand',
      collectionLogCategory: 'kalphite_queen',
    }),
  ],
};
