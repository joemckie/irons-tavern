import { formatWikiImageUrl } from '@/app/rank-calculator/utils/format-wiki-url';
import { ItemCategory } from '@/app/schemas/items';
import { singleItem } from '../utils/item-builders';

export const madAngel: ItemCategory = {
  image: formatWikiImageUrl('Aggy chathead', 'category'),
  items: [
    singleItem({
      name: 'Hallowfell',
      collectionLogCategory: 'the_mad_angel',
    }),
    singleItem({
      name: 'Jar of Light',
      collectionLogCategory: 'the_mad_angel',
    }),
    singleItem({
      name: 'Aggy',
      collectionLogCategory: 'the_mad_angel',
    }),
  ],
};
