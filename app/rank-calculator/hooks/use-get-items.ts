import { itemList } from '@/data/item-list';
import { useSuspenseQuery } from '@tanstack/react-query';

export function useGetItems() {
  return useSuspenseQuery({
    queryKey: ['items'],
    async queryFn() {
      return Object.entries(itemList);
    },
  });
}
