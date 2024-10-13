import { VariableSizeList } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import { MemoisedCategory } from './category';
import { useDynamicItemSize } from '../hooks/use-dynamic-item-size';
import { useGetItems } from '../hooks/use-get-items';
import { Box } from '@radix-ui/themes';

export function ItemList() {
  const { getSize, listRef, resetAfterIndex, setSize } = useDynamicItemSize();
  const { data } = useGetItems();
  const categories = Object.entries(data);

  return (
    <Box height="100%" width="100%">
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
              <MemoisedCategory
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
