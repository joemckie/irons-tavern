import { ItemCategory } from '@/types/rank-calculator';
import { Category } from './category';
import { Flex } from '@radix-ui/themes';

interface ItemListProps {
  categories: [string, ItemCategory][] | undefined;
}

export function ItemList({ categories }: ItemListProps) {
  if (!categories) {
    return null;
  }

  return (
    <Flex direction="column" gap="4">
      {categories.map(([title, category]) => (
        <Category
          title={title}
          items={category.items}
          image={category.image}
          key={title}
        />
      ))}
    </Flex>
  );
}
