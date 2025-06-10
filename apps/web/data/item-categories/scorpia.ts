import { ItemCategory } from '@/app/schemas/items';
import { singleItem } from '../utils/item-builders';

export const scorpia: ItemCategory = {
  items: [
    singleItem({
      name: "Scorpia's offspring",
      collectionLogCategory: 'scorpia',
    }),
  ],
};
