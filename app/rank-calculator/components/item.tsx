import { memo } from 'react';
import { FieldError } from 'react-hook-form';
import { Flex, Table, Text } from '@radix-ui/themes';
import { Item } from '@/app/schemas/items';
import { Checkbox } from './checkbox';
import { stripEntityName } from '../utils/strip-entity-name';
import { EntityImage } from './entity-image';
import { useCalculatorScaling } from '../hooks/point-calculator/use-calculator-scaling';
import { ValidationTooltip } from './validation-tooltip';

interface ItemProps {
  acquired: boolean;
  item: Item;
  error: FieldError | undefined;
}

export const MemoisedItem = memo(({ item, acquired, error }: ItemProps) => {
  const scaling = useCalculatorScaling();
  const scaledItemPoints = Math.floor(item.points * scaling);

  return (
    <Table.Row key={item.name} align="center">
      <Table.Cell>
        <Flex align="center" gap="2">
          <EntityImage
            alt={`${item.name} icon`}
            src={item.image}
            fallback="?"
          />
          <ValidationTooltip error={error}>
            <Text>{item.name}</Text>
          </ValidationTooltip>
        </Flex>
      </Table.Cell>
      <Table.Cell align="right">
        <Checkbox
          checked={acquired}
          name={`acquiredItems.${stripEntityName(item.name)}`}
        />
      </Table.Cell>
      <Table.Cell
        aria-label={`${item.name} points`}
        align="right"
        width="100px"
      >
        {`${acquired ? scaledItemPoints : 0} / ${scaledItemPoints}`}
      </Table.Cell>
    </Table.Row>
  );
});

MemoisedItem.displayName = 'MemoisedItem';
