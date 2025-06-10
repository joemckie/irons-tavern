import { formatWikiImageUrl } from '@/app/rank-calculator/utils/format-wiki-url';
import { ItemCategory } from '@/app/schemas/items';
import { compoundItem, singleItem } from '../utils/item-builders';

export const tormentedDemons: ItemCategory = {
  image: formatWikiImageUrl('Tormented Demon (1)', 'category'),
  items: [
    compoundItem({
      name: 'Burning claws',
      requiredItems: [{ clogName: 'Burning claw', amount: 2 }],
      collectionLogCategories: ['tormented_demons'],
    }),
    ...Array.from({ length: 3 }).map((_, i) =>
      singleItem({
        name: `Tormented synapse (${i + 1})`,
        clogName: 'Tormented synapse',
        requiredAmount: i + 1,
        collectionLogCategory: 'tormented_demons',
        ignoreAmountMultiplier: true,
      }),
    ),
  ],
};
