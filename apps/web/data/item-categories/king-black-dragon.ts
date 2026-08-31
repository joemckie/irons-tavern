import { ItemCategory } from '@/app/schemas/items';
import { singleItem } from '../utils/item-builders';

export const kingBlackDragon: ItemCategory = {
  items: [
    singleItem({
      name: 'Prince Black Dragon',
      collectionLogCategory: 'king_black_dragon',
    }),
  ],
};
