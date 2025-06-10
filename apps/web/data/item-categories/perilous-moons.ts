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
      name: 'Eclipse moon helm',
      collectionLogCategory: 'moons_of_peril',
    }),
    singleItem({
      name: 'Eclipse moon chestplate',
      collectionLogCategory: 'moons_of_peril',
    }),
    singleItem({
      name: 'Eclipse moon tassets',
      collectionLogCategory: 'moons_of_peril',
    }),
    singleItem({
      name: 'Dual macuahuitl',
      collectionLogCategory: 'moons_of_peril',
    }),
    singleItem({
      name: 'Blood moon helm',
      collectionLogCategory: 'moons_of_peril',
    }),
    singleItem({
      name: 'Blood moon chestplate',
      collectionLogCategory: 'moons_of_peril',
    }),
    singleItem({
      name: 'Blood moon tassets',
      collectionLogCategory: 'moons_of_peril',
    }),
    singleItem({
      name: 'Blue moon spear',
      collectionLogCategory: 'moons_of_peril',
    }),
    singleItem({
      name: 'Blue moon helm',
      collectionLogCategory: 'moons_of_peril',
    }),
    singleItem({
      name: 'Blue moon chestplate',
      collectionLogCategory: 'moons_of_peril',
    }),
    singleItem({
      name: 'Blue moon tassets',
      collectionLogCategory: 'moons_of_peril',
    }),
  ],
};
