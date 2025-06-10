import { formatWikiImageUrl } from '@/app/rank-calculator/utils/format-wiki-url';
import { ItemCategory } from '@/app/schemas/items';
import { compoundItem, singleItem } from '../utils/item-builders';

export const abyssalSire: ItemCategory = {
  image: formatWikiImageUrl('Abyssal orphan (follower)', 'category'),
  items: [
    compoundItem({
      name: 'Abyssal bludgeon',
      requiredItems: [
        { clogName: 'Bludgeon axon' },
        { clogName: 'Bludgeon claw' },
        { clogName: 'Bludgeon spine' },
      ],
      collectionLogCategories: ['abyssal_sire'],
    }),
    singleItem({
      name: 'Abyssal dagger',
      targetDropSources: ['Unsired'],
      collectionLogCategory: 'abyssal_sire',
    }),
    singleItem({
      name: 'Jar of miasma',
      collectionLogCategory: 'abyssal_sire',
    }),
    singleItem({
      name: 'Abyssal orphan',
      collectionLogCategory: 'abyssal_sire',
    }),
  ],
};
