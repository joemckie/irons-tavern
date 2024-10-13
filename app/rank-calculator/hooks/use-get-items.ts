import { constants } from '@/config/constants';
import { ItemsResponse } from '@/types/rank-calculator';
import { useSuspenseQuery } from '@tanstack/react-query';

export function useGetItems() {
  return useSuspenseQuery({
    queryKey: ['items'],
    async queryFn() {
      const response = await fetch(`${constants.publicUrl}/api/get-items`);

      return response.json() as Promise<ItemsResponse>;
    },
  });
}
