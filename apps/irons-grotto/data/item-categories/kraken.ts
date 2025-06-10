import { ItemCategory } from '@/app/schemas/items';
import { singleItem } from '../utils/item-builders';

export const kraken: ItemCategory = {
  items: [
    singleItem({
      name: 'Trident of the seas (full)',
      collectionLogCategory: 'kraken',
    }),
    singleItem({
      name: 'Kraken tentacle',
      collectionLogCategory: 'kraken',
    }),
    singleItem({
      name: 'Jar of dirt',
      collectionLogCategory: 'kraken',
    }),
    singleItem({
      name: 'Pet kraken',
      collectionLogCategory: 'kraken',
    }),
  ],
};
