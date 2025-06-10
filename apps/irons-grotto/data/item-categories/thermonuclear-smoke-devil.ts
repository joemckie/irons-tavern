import { formatWikiImageUrl } from '@/app/rank-calculator/utils/format-wiki-url';
import { ItemCategory } from '@/app/schemas/items';
import { singleItem } from '../utils/item-builders';

export const thermonuclearSmokeDevil: ItemCategory = {
  image: formatWikiImageUrl('Pet smoke devil chathead', 'category'),
  items: [
    singleItem({
      name: 'Occult necklace',
      collectionLogCategory: 'thermonuclear_smoke_devil',
      targetDropSources: ['Thermonuclear smoke devil'],
    }),
    singleItem({
      name: 'Smoke battlestaff',
      collectionLogCategory: 'thermonuclear_smoke_devil',
    }),
    singleItem({
      name: 'Jar of smoke',
      collectionLogCategory: 'thermonuclear_smoke_devil',
    }),
    singleItem({
      name: 'Pet smoke devil',
      collectionLogCategory: 'thermonuclear_smoke_devil',
    }),
  ],
};
