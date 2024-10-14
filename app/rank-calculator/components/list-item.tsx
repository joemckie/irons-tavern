import { ItemCategory } from '@/types/rank-calculator';
import { Box } from '@radix-ui/themes';
import { memo, useEffect, useRef } from 'react';
import { areEqual, ListChildComponentProps } from 'react-window';
import { Category } from './category';

interface MemoisedCategoryProps
  extends ListChildComponentProps<[string, ItemCategory][]> {
  setSize: (index: number, size: number) => void;
}

export const ListItem = memo(
  ({ style, index, data, setSize }: MemoisedCategoryProps) => {
    const [title, category] = data[index];
    const elementRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (elementRef.current) {
        const size =
          elementRef.current.getBoundingClientRect().height +
          parseInt(
            window
              .getComputedStyle(elementRef.current)
              .getPropertyValue('margin-bottom'),
            10,
          );

        setSize(index, size);
      }
    }, [setSize, index]);

    return (
      <Box
        style={{
          ...style,
          top: `calc(${Number(style?.top ?? 0)}px + var(--space-3))`,
        }}
      >
        <Category
          ref={elementRef}
          title={title}
          items={category.items}
          image={category.image}
          key={title}
        />
      </Box>
    );
  },
  areEqual,
);

ListItem.displayName = 'ListItem';
