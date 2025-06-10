import { formatWikiImageUrl } from '@/app/rank-calculator/utils/format-wiki-url';
import { ItemCategory } from '@/app/schemas/items';
import { singleItem } from '../utils/item-builders';

export const fortisColosseum: ItemCategory = {
  image: formatWikiImageUrl('Smol heredit detail', 'category'),
  items: [
    singleItem({
      name: 'Sunfire fanatic helm',
      collectionLogCategory: 'fortis_colosseum',
      targetDropSources: ['Rewards Chest (Fortis Colosseum)#Wave 12'],
    }),
    singleItem({
      name: 'Sunfire fanatic cuirass',
      collectionLogCategory: 'fortis_colosseum',
      targetDropSources: ['Rewards Chest (Fortis Colosseum)#Wave 12'],
    }),
    singleItem({
      name: 'Sunfire fanatic chausses',
      collectionLogCategory: 'fortis_colosseum',
      targetDropSources: ['Rewards Chest (Fortis Colosseum)#Wave 12'],
    }),
    singleItem({
      name: 'Echo crystal',
      collectionLogCategory: 'fortis_colosseum',
      targetDropSources: ['Rewards Chest (Fortis Colosseum)#Wave 12'],
    }),
    singleItem({
      name: 'Tonalztics of ralos',
      clogName: 'Tonalztics of ralos (uncharged)',
      collectionLogCategory: 'fortis_colosseum',
      targetDropSources: ['Rewards Chest (Fortis Colosseum)#Wave 12'],
    }),
    singleItem({
      name: 'Smol heredit',
      collectionLogCategory: 'fortis_colosseum',
    }),
  ],
};
