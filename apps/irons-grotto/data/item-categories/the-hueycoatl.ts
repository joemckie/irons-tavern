import { ItemCategory } from '@/app/schemas/items';
import { singleItem } from '../utils/item-builders';

export const theHueycoatl: ItemCategory = {
  items: [
    singleItem({
      name: 'Dragon hunter wand',
      collectionLogCategory: 'hueycoatl',
    }),
    singleItem({
      name: 'Tome of earth',
      clogName: 'Tome of earth (empty)',
      collectionLogCategory: 'hueycoatl',
    }),
    singleItem({
      name: 'Huberte',
      collectionLogCategory: 'hueycoatl',
    }),
  ],
};
