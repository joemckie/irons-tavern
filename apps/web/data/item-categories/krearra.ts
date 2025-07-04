import { formatWikiImageUrl } from '@/app/rank-calculator/utils/format-wiki-url';
import { ItemCategory } from '@/app/schemas/items';
import { singleItem } from '../utils/item-builders';

export const krearra: ItemCategory = {
  image: formatWikiImageUrl("Kree'arra chathead", 'category'),
  items: [
    singleItem({
      name: 'Armadyl helmet',
      collectionLogCategory: 'kree_arra',
      targetDropSources: ["Kree'arra"],
    }),
    singleItem({
      name: 'Armadyl chestplate',
      collectionLogCategory: 'kree_arra',
      targetDropSources: ["Kree'arra"],
    }),
    singleItem({
      name: 'Armadyl chainskirt',
      collectionLogCategory: 'kree_arra',
      targetDropSources: ["Kree'arra"],
    }),
    singleItem({
      name: 'Armadyl hilt',
      collectionLogCategory: 'kree_arra',
    }),
    singleItem({
      name: "Pet kree'arra",
      collectionLogCategory: 'kree_arra',
    }),
  ],
};
