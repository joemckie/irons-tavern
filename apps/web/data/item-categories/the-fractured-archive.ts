import { formatWikiImageUrl } from '@/app/rank-calculator/utils/format-wiki-url';
import { ItemCategory } from '@/app/schemas/items';
import { singleItem } from '../utils/item-builders';

export const theFracturedArchive: ItemCategory = {
  image: formatWikiImageUrl('Orion chathead', 'category'),
  items: [
    singleItem({
      name: 'Obligator',
      clogName: 'Obligator (uncharged)',
      collectionLogCategory: 'the_fractured_archive',
    }),
    singleItem({
      name: 'Ascension crossbows',
      collectionLogCategory: 'the_fractured_archive',
    }),
    singleItem({
      name: "Zorya's Tome",
      clogName: "Zorya's tome (uncharged)",
      collectionLogCategory: 'the_fractured_archive',
    }),
    singleItem({
      name: "Rondache",
      collectionLogCategory: 'the_fractured_archive',
    }),
    singleItem({
      name: "Horn of Bran",
      collectionLogCategory: 'the_fractured_archive',
    }),
    singleItem({
      name: 'Fragment of whispering wind',
      collectionLogCategory: 'the_fractured_archive'
    }),
    singleItem({
      name: 'Fragment of deep water',
      collectionLogCategory: 'the_fractured_archive'
    }),
    singleItem({
      name: 'Fragment of living earth',
      collectionLogCategory: 'the_fractured_archive'
    }),
    singleItem({
      name: 'Fragment of burning fire',
      collectionLogCategory: 'the_fractured_archive'
    }),
    singleItem({
      name: 'Orion',
      collectionLogCategory: 'the_fractured_archive',
    }),
  ],
};
