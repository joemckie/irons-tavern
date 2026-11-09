import { formatWikiImageUrl } from '@/app/rank-calculator/utils/format-wiki-url';
import { ItemCategory } from '@/app/schemas/items';
import { singleItem } from '../utils/item-builders';
import { calculateRaidsCapePoints } from '../utils/calculate-raids-cape-points';

export const tombsOfAmascut: ItemCategory = {
  image: formatWikiImageUrl('Tombs of Amascut - Expert Mode icon', 'category'),
  items: [
    singleItem({
      name: 'Thread of Elidinis',
      collectionLogCategory: 'tombs_of_amascut',
    }),
    singleItem({
      name: 'Eye of the Corruptor',
      collectionLogCategory: 'tombs_of_amascut',
    }),
    singleItem({
      name: 'Jewel of the Sun',
      collectionLogCategory: 'tombs_of_amascut',
    }),
    singleItem({
      name: 'Breach of the Scarab',
      collectionLogCategory: 'tombs_of_amascut',
    }),
    singleItem({
      name: 'Jewel of Amascut',
      collectionLogCategory: 'tombs_of_amascut',
    }),
    singleItem({
      name: "Osmumten's fang",
      collectionLogCategory: 'tombs_of_amascut',
    }),
    singleItem({
      name: 'Lightbearer',
      collectionLogCategory: 'tombs_of_amascut',
    }),
    singleItem({
      name: "Elidinis' ward",
      collectionLogCategory: 'tombs_of_amascut',
    }),
    singleItem({
      name: 'Masori mask',
      collectionLogCategory: 'tombs_of_amascut',
    }),
    singleItem({
      name: 'Masori body',
      collectionLogCategory: 'tombs_of_amascut',
    }),
    singleItem({
      name: 'Masori chaps',
      collectionLogCategory: 'tombs_of_amascut',
    }),
    singleItem({
      name: "Tumeken's shadow",
      clogName: "Tumeken's shadow (uncharged)",
      collectionLogCategory: 'tombs_of_amascut',
    }),
    singleItem({
      name: 'Masori crafting kit',
      collectionLogCategory: 'tombs_of_amascut',
    }),
    singleItem({
      name: 'Menaphite ornament kit',
      collectionLogCategory: 'tombs_of_amascut',
    }),
    singleItem({
      name: 'Remnant of Akkha',
      collectionLogCategory: 'tombs_of_amascut',
    }),
    singleItem({
      name: 'Remnant of Ba-Ba',
      collectionLogCategory: 'tombs_of_amascut',
    }),
    singleItem({
      name: 'Remnant of Kephri',
      collectionLogCategory: 'tombs_of_amascut',
    }),
    singleItem({
      name: 'Remnant of Zebak',
      collectionLogCategory: 'tombs_of_amascut',
    }),
    singleItem({
      name: 'Ancient remnant',
      collectionLogCategory: 'tombs_of_amascut',
    }),
    singleItem({
      name: 'Cursed phalanx',
      collectionLogCategory: 'tombs_of_amascut',
    }),
    singleItem({
      name: "Tumeken's guardian",
      collectionLogCategory: 'tombs_of_amascut',
    }),
    singleItem({
      name: "Icthlarin's shroud (tier 1)",
      collectionLogCategory: 'tombs_of_amascut',
      points: calculateRaidsCapePoints(2000, 2000, 100)
    }),
    singleItem({
      name: "Icthlarin's shroud (tier 2)",
      collectionLogCategory: 'tombs_of_amascut',
      points: calculateRaidsCapePoints(2000, 2000, 400)
    }),
    singleItem({
      name: "Icthlarin's shroud (tier 3)",
      collectionLogCategory: 'tombs_of_amascut',
      points: calculateRaidsCapePoints(2000, 2000, 500)
    }),
    singleItem({
      name: "Icthlarin's shroud (tier 4)",
      collectionLogCategory: 'tombs_of_amascut',
      points: calculateRaidsCapePoints(2000, 2000, 500)
    }),
    singleItem({
      name: "Icthlarin's shroud (tier 5)",
      collectionLogCategory: 'tombs_of_amascut',
      points: calculateRaidsCapePoints(2000, 2000, 500)
    }),
  ],
};
