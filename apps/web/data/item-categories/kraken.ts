import { ItemCategory } from '@/app/schemas/items';
import { singleItem } from '../utils/item-builders';

export const kraken: ItemCategory = {
  items: [
    singleItem({
      name: 'Trident of the Seas (full)',
      collectionLogCategory: 'kraken',
    }),
    singleItem({
      name: 'Kraken tentacle',
      collectionLogCategory: 'kraken',
    }),
    singleItem({
      name: 'Jar of Dirt',
      collectionLogCategory: 'kraken',
    }),
    singleItem({
      name: 'Pet Kraken',
      collectionLogCategory: 'kraken',
    }),
  ],
};
