import { lazy, Suspense } from 'react';
import { Box, Flex, ScrollArea, Spinner, Text } from '@radix-ui/themes';
import AutoSizer from 'react-virtualized-auto-sizer';
import { useGetItems } from '../hooks/use-get-items';
import { usePageLayout } from '../hooks/use-page-layout';

const Category = lazy(() => import('./category'));

export function ItemList() {
  const { data: categories } = useGetItems();
  const { mainHeightCss } = usePageLayout();

  return (
    <Flex gridArea="main" height={mainHeightCss}>
      <Suspense
        fallback={
          <Flex
            direction="column"
            align="center"
            justify="center"
            flexGrow="1"
            gap="3"
          >
            <Spinner size="3" />
            <Text>Loading...</Text>
          </Flex>
        }
      >
        <AutoSizer>
          {({ height, width }) => (
            <ScrollArea style={{ height, width }}>
              {categories.map(([title, category]) => (
                <Box key={title} pl="3" pr="4">
                  <Category items={category.items} title={title} />
                </Box>
              ))}
            </ScrollArea>
          )}
        </AutoSizer>
      </Suspense>
    </Flex>
  );
}
