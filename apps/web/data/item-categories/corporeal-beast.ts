import { ItemCategory } from '@/app/schemas/items';
import { singleItem, compoundItem } from '../utils/item-builders';

export const corporealBeast: ItemCategory = {
  items: [
    singleItem({
      name: 'Spirit shield',
      collectionLogCategory: 'corporeal_beast',
    }),
    singleItem({
      name: 'Holy elixir',
      collectionLogCategory: 'corporeal_beast',
    }),
    compoundItem({
      name: 'Spectral spirit shield',
      requiredItems: [
        { clogName: 'Spectral sigil' },
        { clogName: 'Spirit shield', ignorePoints: true },
        { clogName: 'Holy elixir', ignorePoints: true },
      ],
      collectionLogCategories: ['corporeal_beast'],
    }),
    compoundItem({
      name: 'Arcane spirit shield',
      requiredItems: [
        { clogName: 'Arcane sigil' },
        { clogName: 'Spirit shield', ignorePoints: true },
        { clogName: 'Holy elixir', ignorePoints: true },
      ],
      collectionLogCategories: ['corporeal_beast'],
    }),
    compoundItem({
      name: 'Elysian spirit shield',
      requiredItems: [
        { clogName: 'Elysian sigil' },
        { clogName: 'Spirit shield', ignorePoints: true },
        { clogName: 'Holy elixir', ignorePoints: true },
      ],
      collectionLogCategories: ['corporeal_beast'],
    }),
    singleItem({
      name: 'Jar of spirits',
      collectionLogCategory: 'corporeal_beast',
    }),
    singleItem({
      name: 'Pet dark core',
      collectionLogCategory: 'corporeal_beast',
    }),
  ],
};
