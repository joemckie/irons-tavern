import { formatWikiImageUrl } from '@/app/rank-calculator/utils/format-wiki-url';
import { ItemCategory } from '@/app/schemas/items';
import { singleItem } from '../utils/item-builders';

export const perilousMoons: ItemCategory = {
  image: formatWikiImageUrl('Blood Moon', 'category'),
  items: [
    singleItem({
      name: 'Eclipse atlatl',
      collectionLogCategory: 'moons_of_peril',
    }),
    singleItem({
      name: 'Eclipse Moon helm',
      collectionLogCategory: 'moons_of_peril',
    }),
    singleItem({
      name: 'Eclipse Moon chestplate',
      collectionLogCategory: 'moons_of_peril',
    }),
    singleItem({
      name: 'Eclipse Moon tassets',
      collectionLogCategory: 'moons_of_peril',
    }),
    singleItem({
      name: 'Dual macuahuitl',
      collectionLogCategory: 'moons_of_peril',
    }),
    singleItem({
      name: 'Blood Moon helm',
      collectionLogCategory: 'moons_of_peril',
    }),
    singleItem({
      name: 'Blood Moon chestplate',
      collectionLogCategory: 'moons_of_peril',
    }),
    singleItem({
      name: 'Blood Moon tassets',
      collectionLogCategory: 'moons_of_peril',
    }),
    singleItem({
      name: 'Blue Moon spear',
      collectionLogCategory: 'moons_of_peril',
    }),
    singleItem({
      name: 'Blue Moon helm',
      collectionLogCategory: 'moons_of_peril',
    }),
    singleItem({
      name: 'Blue Moon chestplate',
      collectionLogCategory: 'moons_of_peril',
    }),
    singleItem({
      name: 'Blue Moon tassets',
      collectionLogCategory: 'moons_of_peril',
    }),
  ],
};
