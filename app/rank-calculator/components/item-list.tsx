import { Box, Flex, ScrollArea } from '@radix-ui/themes';
import { useSearchParams } from 'next/navigation';
import { useGetItems } from '../hooks/use-get-items';
import { usePageHeight } from '../hooks/use-page-height';
import { Category } from './category';

export function ItemList() {
  const search = useSearchParams();
  const { data: categories } = useGetItems(Number(search.get('h')));
  const mainHeightCss = usePageHeight();

  return (
    <Flex asChild gridArea="main" height={{ md: mainHeightCss }}>
      <ScrollArea>
        {categories.map(([title, category]) => (
          <Box key={title} px={{ initial: '3', md: '0' }}>
            <Category
              items={category.items}
              title={title}
              image={'image' in category ? category.image : undefined}
            />
          </Box>
        ))}
      </ScrollArea>
    </Flex>
  );
}
