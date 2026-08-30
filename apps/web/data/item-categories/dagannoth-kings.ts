import { formatWikiImageUrl } from '@/app/rank-calculator/utils/format-wiki-url';
import { ItemCategory } from '@/app/schemas/items';
import { singleItem } from '../utils/item-builders';

export const dagannothKings: ItemCategory = {
  image: formatWikiImageUrl('Dagannoth Prime', 'category'),
  items: [
    singleItem({
      name: 'Archers ring',
      collectionLogCategory: 'dagannoth_kings',
    }),
    singleItem({
      name: 'Berserker ring',
      collectionLogCategory: 'dagannoth_kings',
    }),
    singleItem({
      name: 'Seers ring',
      collectionLogCategory: 'dagannoth_kings',
    }),
    singleItem({
      name: 'Warrior ring',
      collectionLogCategory: 'dagannoth_kings',
    }),
    singleItem({
      name: 'Pet Dagannoth Prime',
      collectionLogCategory: 'dagannoth_kings',
    }),
    singleItem({
      name: 'Pet Dagannoth Rex',
      collectionLogCategory: 'dagannoth_kings',
    }),
    singleItem({
      name: 'Pet Dagannoth Supreme',
      collectionLogCategory: 'dagannoth_kings',
    }),
  ],
};
