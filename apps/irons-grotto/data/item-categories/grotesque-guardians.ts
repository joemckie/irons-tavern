import { formatWikiImageUrl } from '@/app/rank-calculator/utils/format-wiki-url';
import { ItemCategory } from '@/app/schemas/items';
import { singleItem, compoundItem } from '../utils/item-builders';

export const grotesqueGuardians: ItemCategory = {
  image: formatWikiImageUrl('Noon', 'category'),
  items: [
    singleItem({
      name: 'Granite gloves',
      collectionLogCategory: 'grotesque_guardians',
    }),
    singleItem({
      name: 'Granite ring',
      collectionLogCategory: 'grotesque_guardians',
    }),
    singleItem({
      name: 'Granite hammer',
      collectionLogCategory: 'grotesque_guardians',
    }),
    compoundItem({
      name: 'Guardian boots',
      requiredItems: [
        {
          clogName: 'Bandos boots',
          targetDropSources: ['General Graardor'],
          ignorePoints: true,
        },
        { clogName: 'Black tourmaline core' },
      ],
      collectionLogCategories: ['grotesque_guardians', 'general_graardor'],
    }),
    singleItem({
      name: 'Jar of stone',
      collectionLogCategory: 'grotesque_guardians',
    }),
    singleItem({
      name: 'Noon',
      collectionLogCategory: 'grotesque_guardians',
    }),
  ],
};
