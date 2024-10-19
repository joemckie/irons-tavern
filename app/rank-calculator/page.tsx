'use client';

import AutoSizer from 'react-virtualized-auto-sizer';
import { Box, ScrollArea } from '@radix-ui/themes';
import { useGetItems } from './hooks/use-get-items';
import { Category } from './components/category';

export default function RankCalculatorNotableItems() {
  const { data: categories } = useGetItems();

  return (
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
  );
}
