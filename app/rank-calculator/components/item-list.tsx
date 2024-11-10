import { Box, Flex, ScrollArea } from '@radix-ui/themes';
import { useGetItems } from '../hooks/use-get-items';
import { usePageHeight } from '../hooks/use-page-height';
import { Category } from './category';

export function ItemList() {
  const { data: categories } = useGetItems();
  const mainHeightCss = usePageHeight();

  return (
    <Flex asChild gridArea="main" height={{ md: mainHeightCss }}>
      <ScrollArea>
        {categories.map(([title, category]) => (
          <Box key={title} px="3">
            <Category
              items={category.items}
              title={title}
              image={category.image}
            />
          </Box>
        ))}
      </ScrollArea>
    </Flex>
  );
}
