import { ItemCategory } from '@/app/schemas/items';
import { singleItem } from '../utils/item-builders';

export const commanderZilyana: ItemCategory = {
  items: [
    singleItem({
      name: 'Saradomin sword',
      collectionLogCategory: 'commander_zilyana',
      targetDropSources: ['Commander Zilyana'],
    }),
    singleItem({
      name: "Saradomin's light",
      collectionLogCategory: 'commander_zilyana',
    }),
    singleItem({
      name: 'Armadyl crossbow',
      collectionLogCategory: 'commander_zilyana',
    }),
    singleItem({
      name: 'Saradomin hilt',
      collectionLogCategory: 'commander_zilyana',
    }),
    singleItem({
      name: 'Pet zilyana',
      collectionLogCategory: 'commander_zilyana',
    }),
  ],
};
