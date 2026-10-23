import { formatWikiImageUrl } from '@/app/rank-calculator/utils/format-wiki-url';
import { ItemCategory } from '@/app/schemas/items';
import { singleItem } from '../utils/item-builders';

export const maggotKing: ItemCategory = {
  image: formatWikiImageUrl('Maggot marquess chathead', 'category'),
  items: [
    singleItem({
      name: 'Elder venator fang',
      collectionLogCategory: 'maggot_king',
    }),
    singleItem({
      name: 'Crimson kisten',
      collectionLogCategory: 'maggot_king',
    }),
    singleItem({
      name: 'Maggot marquess',
      collectionLogCategory: 'maggot_king',
    }),
  ],
};
