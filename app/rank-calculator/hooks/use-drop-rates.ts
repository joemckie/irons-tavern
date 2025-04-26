import { useSuspenseQuery } from '@tanstack/react-query';
import { fetchItemDropRates } from '../data-sources/fetch-dropped-item-info';

export function useDropRates() {
  return useSuspenseQuery({
    queryKey: ['drop-rates'],
    queryFn: fetchItemDropRates,
  });
}
