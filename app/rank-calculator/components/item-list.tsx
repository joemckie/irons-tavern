import { Box, Flex, ScrollArea } from '@radix-ui/themes';
import { useGetItems } from '../hooks/use-get-items';
import { usePageLayout } from '../hooks/use-page-layout';
import { Category } from './category';

export function ItemList() {
  const { data: categories } = useGetItems();
  const { mainHeightCss } = usePageLayout();

  return (
    <Flex gridArea="main" height={mainHeightCss}>
      <ScrollArea>
        {categories.map(([title, category]) => (
          <Box key={title} pl="3" pr="4">
            <Category items={category.items} title={title} />
          </Box>
        ))}
      </ScrollArea>
    </Flex>
  );
}
