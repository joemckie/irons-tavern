import { formatWikiImageUrl } from '@/app/rank-calculator/utils/format-wiki-url';
import { ItemCategory } from '@/app/schemas/items';
import { singleItem } from '../utils/item-builders';

export const zulrah: ItemCategory = {
  image: formatWikiImageUrl('Snakeling (tanzanite)', 'category'),
  items: [
    singleItem({
      name: 'Toxic blowpipe',
      clogName: 'Tanzanite fang',
      image: formatWikiImageUrl('Toxic blowpipe'),
      requiredLevels: {
        Fletching: 73,
      },
      collectionLogCategory: 'zulrah',
    }),
    singleItem({
      name: 'Magic fang',
      collectionLogCategory: 'zulrah',
    }),
    singleItem({
      name: 'Serpentine visage',
      image: formatWikiImageUrl('Serpentine helm'),
      collectionLogCategory: 'zulrah',
    }),
    singleItem({
      name: 'Tanzanite mutagen',
      collectionLogCategory: 'zulrah',
    }),
    singleItem({
      name: 'Magma mutagen',
      collectionLogCategory: 'zulrah',
    }),
    singleItem({
      name: 'Jar of swamp',
      collectionLogCategory: 'zulrah',
    }),
    singleItem({
      name: 'Pet snakeling',
      collectionLogCategory: 'zulrah',
    }),
  ],
};
