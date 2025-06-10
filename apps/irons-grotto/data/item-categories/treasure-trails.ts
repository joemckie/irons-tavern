import { formatWikiImageUrl } from '@/app/rank-calculator/utils/format-wiki-url';
import { ItemCategory } from '@/app/schemas/items';
import { singleItem } from '../utils/item-builders';

export const treasureTrails: ItemCategory = {
  image: formatWikiImageUrl('Clue scroll (master) detail', 'category'),
  items: [
    singleItem({
      name: 'Ranger boots',
      collectionLogCategory: 'medium_treasure_trails',
    }),
    singleItem({
      name: 'Ham joint',
      collectionLogCategory: 'easy_treasure_trails',
    }),
    singleItem({
      name: 'Bloodhound',
      collectionLogCategory: 'master_treasure_trails',
    }),
  ],
};
