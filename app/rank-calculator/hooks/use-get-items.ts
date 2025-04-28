import { itemList } from '@/data/item-list';
import { useSuspenseQuery } from '@tanstack/react-query';
import { isCollectionLogItem, Item, ItemCategory } from '@/app/schemas/items';
import { useDropRates } from './use-drop-rates';
import { calculateItemPoints } from '../utils/calculate-item-points';

export function useGetItems() {
  const { data: dropRates } = useDropRates();

  return useSuspenseQuery({
    queryKey: ['items'],
    async queryFn() {
      return Object.entries(itemList).map(([key, category]) => {
        const items = category.items.map((item) => {
          if (item.points) {
            return item;
          }

          if (isCollectionLogItem(item)) {
            return {
              ...item,
              points: calculateItemPoints(dropRates, item.requiredItems),
            };
          }

          throw new Error(`Could not calculate item points for ${item.name}`);
        }) as NonEmptyArray<Item>;

        return [key, { ...category, items }] as [string, ItemCategory];
      });

      // return Object.entries(itemList).reduce(
      //   (acc, [key, category]) => {
      //     const items = category.items.map((item) => {
      //       if (item.points) {
      //         return item;
      //       }

      //       if (isCollectionLogItem(item)) {
      //         return {
      //           ...item,
      //           points: calculateItemPoints(dropRates, item.requiredItems),
      //         };
      //       }

      //       throw new Error(`Could not calculate item points for ${item.name}`);
      //     }) as NonEmptyArray<Item>;

      //     acc[key] = { ...category, items };

      //     return acc;
      //   },
      //   {} as Record<string, ItemCategory>,
      // );
    },
  });
}
