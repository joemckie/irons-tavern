import { VariableSizeList } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import { useDynamicItemSize } from '../hooks/use-dynamic-item-size';
import { useGetItems } from '../hooks/use-get-items';
import { ListItem } from './list-item';

export function ItemList() {
  const { getSize, listRef, resetAfterIndex, setSize } = useDynamicItemSize();
  const { data: categories } = useGetItems();

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
  );
}
