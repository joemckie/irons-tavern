import { useSuspenseQuery } from '@tanstack/react-query';
import { useDropRates } from './use-drop-rates';
import { buildNotableItemList } from '../utils/build-notable-item-list';

export function useGetItems(h: number) {
  const { data: dropRates } = useDropRates();

  return useSuspenseQuery({
    queryKey: ['items'],
    async queryFn() {
      return Object.entries(buildNotableItemList(dropRates, h));
    },
  });
}
