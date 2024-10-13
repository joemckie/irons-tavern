import { useSuspenseQuery } from '@tanstack/react-query';
import { itemsResponseFixture } from '@/fixtures/items-response.fixture';

export function useGetItems() {
  return useSuspenseQuery({
    queryKey: ['items'],
    async queryFn() {
      return Object.entries(itemsResponseFixture);
    },
  });
}
