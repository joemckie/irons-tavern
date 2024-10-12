import { ItemCategory } from '@/types/rank-calculator';
import { Box, Flex } from '@radix-ui/themes';
import {
  VariableSizeList,
  ListChildComponentProps,
  areEqual,
} from 'react-window';
import { memo, useRef } from 'react';
import AutoSizer from 'react-virtualized-auto-sizer';
import { Category } from './category';

const MemoisedCategory = memo(
  ({
    style,
    index,
    data,
  }: ListChildComponentProps<[string, ItemCategory][]>) => {
    const [title, category] = data[index];

    console.log(style);

    return (
      <Box style={style} asChild>
        <Category
          index={index}
          title={title}
          items={category.items}
          image={category.image}
          key={title}
          setSize={(index, size) => {
            categoryHeightsRef.current[index] = size;
          }}
        />
      </Box>
    );
  },
  areEqual,
);

interface ItemListProps {
  categories: [string, ItemCategory][] | undefined;
}

export function ItemList({ categories }: ItemListProps) {
  const categoryHeightsRef = useRef<(number | undefined)[]>([]);

  if (!categories) {
    return null;
  }

  return (
    <AutoSizer>
      {({ height, width }) => (
        <VariableSizeList
          itemData={categories}
          itemCount={categories.length}
          height={height}
          width={width}
          itemSize={(index) => {
            console.log(
              index,
              categoryHeightsRef,
              categoryHeightsRef.current[index] ?? 0,
            );
            return categoryHeightsRef.current[index] ?? 0;
          }}
        >
          {MemoisedCategory}
        </VariableSizeList>
      )}
    </AutoSizer>
  );

  // return (
  //   <Flex direction="column" gap="4">
  //     {categories.map(([title, category]) => (
  //       <Category
  //         title={title}
  //         items={category.items}
  //         image={category.image}
  //         key={title}
  //       />
  //     ))}
  //   </Flex>
  // );
}
