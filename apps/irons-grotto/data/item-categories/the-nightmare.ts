import { formatWikiImageUrl } from '@/app/rank-calculator/utils/format-wiki-url';
import { ItemCategory } from '@/app/schemas/items';
import { singleItem } from '../utils/item-builders';

export const theNightmare: ItemCategory = {
  image: formatWikiImageUrl('Little nightmare chathead', 'category'),
  items: [
    singleItem({
      name: 'Nightmare staff',
      collectionLogCategory: 'the_nightmare',
      targetDropSources: ["Phosani's Nightmare"],
    }),
    singleItem({
      name: "Inquisitor's great helm",
      collectionLogCategory: 'the_nightmare',
      targetDropSources: ["Phosani's Nightmare"],
    }),
    singleItem({
      name: "Inquisitor's hauberk",
      collectionLogCategory: 'the_nightmare',
      targetDropSources: ["Phosani's Nightmare"],
    }),
    singleItem({
      name: "Inquisitor's plateskirt",
      collectionLogCategory: 'the_nightmare',
      targetDropSources: ["Phosani's Nightmare"],
    }),
    singleItem({
      name: "Inquisitor's mace",
      collectionLogCategory: 'the_nightmare',
      targetDropSources: ["Phosani's Nightmare"],
    }),
    singleItem({
      name: 'Eldritch orb',
      collectionLogCategory: 'the_nightmare',
      targetDropSources: ["Phosani's Nightmare"],
    }),
    singleItem({
      name: 'Harmonised orb',
      collectionLogCategory: 'the_nightmare',
      targetDropSources: ["Phosani's Nightmare"],
    }),
    singleItem({
      name: 'Volatile orb',
      collectionLogCategory: 'the_nightmare',
      targetDropSources: ["Phosani's Nightmare"],
    }),
    singleItem({
      name: 'Parasitic egg',
      collectionLogCategory: 'the_nightmare',
      targetDropSources: ["Phosani's Nightmare"],
    }),
    singleItem({
      name: 'Jar of dreams (Nightmare)',
      clogName: 'Jar of dreams',
      collectionLogCategory: 'the_nightmare',
      targetDropSources: ["Phosani's Nightmare"],
    }),
    singleItem({
      name: 'Little nightmare',
      targetDropSources: ["Phosani's Nightmare"],
      collectionLogCategory: 'the_nightmare',
    }),
  ],
};
