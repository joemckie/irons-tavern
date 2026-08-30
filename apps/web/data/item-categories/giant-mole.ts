import { ItemCategory } from '@/app/schemas/items';
import { singleItem } from '../utils/item-builders';

export const giantMole: ItemCategory = {
  items: [
    singleItem({
      name: 'Baby Mole',
      collectionLogCategory: 'giant_mole',
    }),
  ],
};
