import { formatWikiImageUrl } from '@/app/rank-calculator/utils/format-wiki-url';
import { ItemCategory } from '@/app/schemas/items';
import { singleItem } from '../utils/item-builders';

export const venenatisAndSpindel: ItemCategory = {
  image: formatWikiImageUrl('Venenatis spiderling chathead', 'category'),
  items: [
    singleItem({
      name: 'Treasonous ring',
      collectionLogCategory: 'venenatis_and_spindel',
      targetDropSources: ['Spindel'],
    }),
    singleItem({
      name: 'Fangs of venenatis',
      collectionLogCategory: 'venenatis_and_spindel',
      targetDropSources: ['Spindel'],
    }),
    singleItem({
      name: 'Voidwaker gem',
      collectionLogCategory: 'venenatis_and_spindel',
      targetDropSources: ['Spindel'],
    }),
    singleItem({
      name: 'Venenatis spiderling',
      collectionLogCategory: 'venenatis_and_spindel',
      targetDropSources: ['Spindel'],
    }),
  ],
};
