'use client';

import { VariableSizeList } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import { Box } from '@radix-ui/themes';
import { useDynamicItemSize } from '../hooks/use-dynamic-item-size';
import { useGetItems } from '../hooks/use-get-items';
import { ListItem } from '../components/list-item';

export default function RankCalculatorNotableItems() {
  const { getSize, listRef, resetAfterIndex, setSize } = useDynamicItemSize();
  const { data: categories } = useGetItems();

  return (
    <Box pl="3" width="100%">
      <AutoSizer
        onResize={() => {
          resetAfterIndex(0, true);
        }}
      >
        {({ height, width }) => (
          <VariableSizeList
            ref={listRef}
            itemData={categories}
            itemCount={categories.length}
            height={height}
            width={width}
            itemSize={getSize}
          >
            {({ index, style }) => (
              <ListItem
                data={categories}
                index={index}
                style={style}
                setSize={setSize}
              />
            )}
          </VariableSizeList>
        )}
      </AutoSizer>
    </Box>
  );
}
