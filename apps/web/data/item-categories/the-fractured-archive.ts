import { formatWikiImageUrl } from '@/app/rank-calculator/utils/format-wiki-url';
import { ItemCategory } from '@/app/schemas/items';
import { singleItem } from '../utils/item-builders';
import { calculateRaidsCapePoints } from '../utils/calculate-raids-cape-points';

export const theFracturedArchive: ItemCategory = {
  image: formatWikiImageUrl('Orion chathead', 'category'),
  items: [
    singleItem({
      name: 'Obligator',
      clogName: 'Obligator (uncharged)',
      collectionLogCategory: 'the_fractured_archive',
      targetDropSources: ['Chest (The Fractured Archive)#Unique'],
    }),
    singleItem({
      name: 'Ascension crossbows',
      collectionLogCategory: 'the_fractured_archive',
      targetDropSources: ['Chest (The Fractured Archive)#Unique'],
    }),
    singleItem({
      name: "Zorya's Tome",
      clogName: "Zorya's tome (uncharged)",
      collectionLogCategory: 'the_fractured_archive',
      targetDropSources: ['Chest (The Fractured Archive)#Unique'],
    }),
    singleItem({
      name: 'Rondache',
      collectionLogCategory: 'the_fractured_archive',
      targetDropSources: ['Chest (The Fractured Archive)#Unique'],
    }),
    singleItem({
      name: 'Horn of Bran',
      collectionLogCategory: 'the_fractured_archive',
      targetDropSources: ['Chest (The Fractured Archive)#Unique'],
    }),
    singleItem({
      name: 'Fragment of whispering wind',
      collectionLogCategory: 'the_fractured_archive',
      targetDropSources: ['Chest (The Fractured Archive)#Standard'],
    }),
    singleItem({
      name: 'Fragment of deep water',
      collectionLogCategory: 'the_fractured_archive',
      targetDropSources: ['Chest (The Fractured Archive)#Standard'],
    }),
    singleItem({
      name: 'Fragment of living earth',
      collectionLogCategory: 'the_fractured_archive',
      targetDropSources: ['Chest (The Fractured Archive)#Standard'],
    }),
    singleItem({
      name: 'Fragment of burning fire',
      collectionLogCategory: 'the_fractured_archive',
      targetDropSources: ['Chest (The Fractured Archive)#Standard'],
    }),
    singleItem({
      name: 'Orion',
      collectionLogCategory: 'the_fractured_archive',
      targetDropSources: ['Chest (The Fractured Archive)#Standard'],
    }),
    singleItem({
      name: 'Living record (tier 1)',
      collectionLogCategory: 'the_fractured_archive',
      points: calculateRaidsCapePoints(1500, 2000, 100)
    }),
    singleItem({
      name: 'Living record (tier 2)',
      collectionLogCategory: 'the_fractured_archive',
      points: calculateRaidsCapePoints(1500, 2000, 400)
    }),
    singleItem({
      name: 'Living record (tier 3)',
      collectionLogCategory: 'the_fractured_archive',
      points: calculateRaidsCapePoints(1500, 2000, 500)
    }),
    singleItem({
      name: 'Living record (tier 4)',
      collectionLogCategory: 'the_fractured_archive',
      points: calculateRaidsCapePoints(1500, 2000, 500)
    }),
    singleItem({
      name: 'Living record (tier 5)',
      collectionLogCategory: 'the_fractured_archive',
      points: calculateRaidsCapePoints(1500, 2000, 500)
    }),
  ],
};
