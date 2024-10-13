import { ItemCategory } from '@/types/rank-calculator';
import { VariableSizeList } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import { MemoisedCategory } from './category';
import { useDynamicItemSize } from '../hooks/use-dynamic-item-size';
import { Box } from '@radix-ui/themes';

interface ItemListProps {
  categories: [string, ItemCategory][] | undefined;
}

export function ItemList({ categories }: ItemListProps) {
  const { getSize, listRef, resetAfterIndex, setSize } = useDynamicItemSize();

  if (!categories) {
    return null;
  }

  return (
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
          {({ data, index, style }) => (
            <MemoisedCategory
              data={data}
              index={index}
              style={style}
              setSize={setSize}
            />
          )}
        </VariableSizeList>
      )}
    </AutoSizer>
  );
}
