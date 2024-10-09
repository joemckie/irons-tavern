import { ItemsResponse } from '@/types/rank-calculator';
import { Category } from './category';

interface ItemListProps {
  items: ItemsResponse | undefined;
}

export function ItemList({ items }: ItemListProps) {
  if (!items) {
    return null;
  }

  return Object.entries(items).map(([title, items]) => (
    <Category title={title} items={items} key={title} />
  ));
}
