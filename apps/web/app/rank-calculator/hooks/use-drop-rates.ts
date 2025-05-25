import { useSuspenseQuery } from '@tanstack/react-query';
import {
  fetchItemDropRates,
  generateRequiredItemList,
} from '../data-sources/fetch-dropped-item-info';

export function useDropRates() {
  return useSuspenseQuery({
    queryKey: ['drop-rates'],
    queryFn: async () => fetchItemDropRates([...generateRequiredItemList()]),
  });
}
