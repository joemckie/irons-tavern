import { ItemsResponse } from '@/types/rank-calculator';
import { Category } from './category';
import { Flex } from '@radix-ui/themes';

interface ItemListProps {
  items: ItemsResponse | undefined;
}

export function ItemList({ items }: ItemListProps) {
  if (!items) {
    return null;
  }

  return (
    <Flex direction="column" gap="4">
      {Object.entries(items).map(([title, items]) => (
        <Category title={title} items={items} key={title} />
      ))}
    </Flex>
  );
}
