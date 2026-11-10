import { formatWikiImageUrl } from '@/app/rank-calculator/utils/format-wiki-url';
import { ItemCategory } from '@/app/schemas/items';
import { singleItem } from '../utils/item-builders';
import { calculateRaidsCapePoints } from '../utils/calculate-raids-cape-points';

const totalCapesPoints = 2000;

export const chambersOfXeric: ItemCategory = {
  image: formatWikiImageUrl('Olmlet chathead', 'category'),
  items: [
    singleItem({
      name: 'Dexterous prayer scroll',
      image: formatWikiImageUrl('Rigour'),
      collectionLogCategory: 'chambers_of_xeric',
      targetDropSources: ['Ancient chest#Challenge Mode'],
    }),
    singleItem({
      name: 'Arcane prayer scroll',
      image: formatWikiImageUrl('Augury'),
      collectionLogCategory: 'chambers_of_xeric',
      targetDropSources: ['Ancient chest#Challenge Mode'],
    }),
    singleItem({
      name: 'Twisted buckler',
      collectionLogCategory: 'chambers_of_xeric',
      targetDropSources: ['Ancient chest#Challenge Mode'],
    }),
    singleItem({
      name: 'Dragon hunter crossbow',
      collectionLogCategory: 'chambers_of_xeric',
      targetDropSources: ['Ancient chest#Challenge Mode'],
    }),
    singleItem({
      name: "Dinh's bulwark",
      collectionLogCategory: 'chambers_of_xeric',
      targetDropSources: ['Ancient chest#Challenge Mode'],
    }),
    singleItem({
      name: 'Ancestral hat',
      collectionLogCategory: 'chambers_of_xeric',
      targetDropSources: ['Ancient chest#Challenge Mode'],
    }),
    singleItem({
      name: 'Ancestral robe top',
      collectionLogCategory: 'chambers_of_xeric',
      targetDropSources: ['Ancient chest#Challenge Mode'],
    }),
    singleItem({
      name: 'Ancestral robe bottom',
      collectionLogCategory: 'chambers_of_xeric',
      targetDropSources: ['Ancient chest#Challenge Mode'],
    }),
    singleItem({
      name: 'Dragon claws',
      collectionLogCategory: 'chambers_of_xeric',
      targetDropSources: ['Ancient chest#Challenge Mode'],
    }),
    singleItem({
      name: 'Elder maul',
      collectionLogCategory: 'chambers_of_xeric',
      targetDropSources: ['Ancient chest#Challenge Mode'],
    }),
    singleItem({
      name: 'Kodai insignia',
      collectionLogCategory: 'chambers_of_xeric',
      targetDropSources: ['Ancient chest#Challenge Mode'],
    }),
    singleItem({
      name: 'Twisted bow',
      collectionLogCategory: 'chambers_of_xeric',
      targetDropSources: ['Ancient chest#Challenge Mode'],
    }),
    singleItem({
      name: 'Twisted ancestral colour kit',
      collectionLogCategory: 'chambers_of_xeric',
      ignoreDropRateModifier: true,
    }),
    singleItem({
      name: 'Metamorphic dust',
      collectionLogCategory: 'chambers_of_xeric',
      ignoreDropRateModifier: true,
    }),
    singleItem({
      name: 'Olmlet',
      collectionLogCategory: 'chambers_of_xeric',
    }),
    singleItem({
      name: "Xeric's guard",
      collectionLogCategory: 'chambers_of_xeric',
      points: calculateRaidsCapePoints(totalCapesPoints, 2000, 100)
    }),
    singleItem({
      name: "Xeric's warrior",
      collectionLogCategory: 'chambers_of_xeric',
      points: calculateRaidsCapePoints(totalCapesPoints, 2000, 400)
    }),
    singleItem({
      name: "Xeric's sentinel",
      collectionLogCategory: 'chambers_of_xeric',
      points: calculateRaidsCapePoints(totalCapesPoints, 2000, 500)
    }),
    singleItem({
      name: "Xeric's general",
      collectionLogCategory: 'chambers_of_xeric',
      points: calculateRaidsCapePoints(totalCapesPoints, 2000, 500)
    }),
    singleItem({
      name: "Xeric's champion",
      collectionLogCategory: 'chambers_of_xeric',
      points: calculateRaidsCapePoints(totalCapesPoints, 2000, 500)
    }),
  ],
};
