import { formatWikiImageUrl } from '@/app/rank-calculator/utils/format-wiki-url';
import { ItemCategory } from '@/app/schemas/items';
import { singleItem } from '../utils/item-builders';

export const amoxliatl: ItemCategory = {
  image: formatWikiImageUrl('Moxi chathead', 'category'),
  items: [
    singleItem({
      name: 'Glacial temotli',
      collectionLogCategory: 'amoxliatl',
      targetDropSources: ["Amoxliatl#Post-quest"],
    }),
    singleItem({
      name: 'Moxi',
      collectionLogCategory: 'amoxliatl',
    }),
  ],
};
