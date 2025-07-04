import { formatWikiImageUrl } from '@/app/rank-calculator/utils/format-wiki-url';
import { Item, ItemCategory } from '@/app/schemas/items';
import { compoundItem, singleItem } from '../utils/item-builders';

export const demonicGorillas: ItemCategory = {
  image: formatWikiImageUrl('Demonic gorilla', 'category'),
  items: [
    compoundItem({
      name: 'Heavy ballista',
      requiredItems: [
        {
          clogName: 'Ballista spring',
          targetDropSources: ['Demonic gorilla'],
        },
        { clogName: 'Monkey tail', targetDropSources: ['Demonic gorilla'] },
        { clogName: 'Heavy frame', targetDropSources: ['Demonic gorilla'] },
        {
          clogName: 'Ballista limbs',
          targetDropSources: ['Demonic gorilla'],
        },
      ],
      requiredLevels: {
        Fletching: 72,
      },
      collectionLogCategories: ['gloughs_experiments'],
    }),
    ...Array.from({ length: 4 }).map<Item>((_, i) =>
      singleItem({
        name: `Zenyte shard (${i + 1})`,
        clogName: 'Zenyte shard',
        requiredAmount: i + 1,
        collectionLogCategory: 'gloughs_experiments',
        ignoreAmountMultiplier: true,
        targetDropSources: ['Demonic gorilla'],
      }),
    ),
  ],
};
