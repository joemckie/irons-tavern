import { formatWikiImageUrl } from '@/app/rank-calculator/utils/format-wiki-url';
import { ItemCategory } from '@/app/schemas/items';
import { compoundItem, singleItem } from '../utils/item-builders';

export const alchemicalHydra: ItemCategory = {
  image: formatWikiImageUrl('Alchemical Hydra (serpentine)', 'category'),
  items: [
    compoundItem({
      name: 'Brimstone ring',
      requiredItems: [
        { clogName: "Hydra's eye", targetDropSources: ['Alchemical Hydra'] },
        { clogName: "Hydra's fang", targetDropSources: ['Alchemical Hydra'] },
        {
          clogName: "Hydra's heart",
          targetDropSources: ['Alchemical Hydra'],
        },
      ],
      collectionLogCategories: ['alchemical_hydra'],
    }),
    singleItem({
      name: 'Hydra tail',
      collectionLogCategory: 'alchemical_hydra',
      targetDropSources: ['Alchemical Hydra'],
    }),
    singleItem({
      name: 'Hydra leather',
      collectionLogCategory: 'alchemical_hydra',
    }),
    singleItem({
      name: "Hydra's claw",
      collectionLogCategory: 'alchemical_hydra',
    }),
    singleItem({
      name: 'Jar of chemicals',
      collectionLogCategory: 'alchemical_hydra',
    }),
    singleItem({
      name: 'Ikkle hydra',
      image: formatWikiImageUrl('Ikkle Hydra (serpentine) chathead'),
      collectionLogCategory: 'alchemical_hydra',
    }),
  ],
};
