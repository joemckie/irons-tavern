import { Box, Flex, ScrollArea } from '@radix-ui/themes';
import { useFormContext } from 'react-hook-form';
import { useGetItems } from '../hooks/use-get-items';
import { usePageHeight } from '../hooks/use-page-height';
import { Category } from './category';
import { RankCalculatorSchema } from '../[player]/submit-rank-calculator-validation';
import { stripEntityName } from '../utils/strip-entity-name';

export function ItemList() {
  const { data: categories } = useGetItems();
  const mainHeightCss = usePageHeight();
  const { getFieldState } = useFormContext<RankCalculatorSchema>();

  return (
    <Flex asChild gridArea="main" height={{ md: mainHeightCss }}>
      <ScrollArea>
        {categories.map(([title, category]) => {
          const fieldErrors = category.items.map(
            ({ name }) =>
              getFieldState(`acquiredItems.${stripEntityName(name)}`).error,
          );

          return (
            <Box key={title} px={{ initial: '3', md: '0' }}>
              <Category
                items={category.items}
                title={title}
                image={category.image}
                errors={fieldErrors}
              />
            </Box>
          );
        })}
      </ScrollArea>
    </Flex>
  );
}
