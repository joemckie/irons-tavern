import { formatWikiImageUrl } from '@/app/rank-calculator/utils/format-wiki-url';
import { ItemCategory } from '@/app/schemas/items';
import { singleItem } from '../utils/item-builders';

export const chambersOfXeric: ItemCategory = {
  image: formatWikiImageUrl('Olmlet chathead', 'category'),
  items: [
    singleItem({
      name: 'Dexterous prayer scroll',
      image: formatWikiImageUrl('Rigour'),
      collectionLogCategory: 'chambers_of_xeric',
    }),
    singleItem({
      name: 'Arcane prayer scroll',
      image: formatWikiImageUrl('Augury'),
      collectionLogCategory: 'chambers_of_xeric',
    }),
    singleItem({
      name: 'Twisted buckler',
      collectionLogCategory: 'chambers_of_xeric',
    }),
    singleItem({
      name: 'Dragon hunter crossbow',
      collectionLogCategory: 'chambers_of_xeric',
    }),
    singleItem({
      name: "Dinh's bulwark",
      collectionLogCategory: 'chambers_of_xeric',
    }),
    singleItem({
      name: 'Ancestral hat',
      collectionLogCategory: 'chambers_of_xeric',
    }),
    singleItem({
      name: 'Ancestral robe top',
      collectionLogCategory: 'chambers_of_xeric',
    }),
    singleItem({
      name: 'Ancestral robe bottom',
      collectionLogCategory: 'chambers_of_xeric',
    }),
    singleItem({
      name: 'Dragon claws',
      collectionLogCategory: 'chambers_of_xeric',
    }),
    singleItem({
      name: 'Elder maul',
      collectionLogCategory: 'chambers_of_xeric',
    }),
    singleItem({
      name: 'Kodai insignia',
      collectionLogCategory: 'chambers_of_xeric',
    }),
    singleItem({
      name: 'Twisted bow',
      collectionLogCategory: 'chambers_of_xeric',
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
  ],
};
