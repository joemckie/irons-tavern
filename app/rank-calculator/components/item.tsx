import { memo } from 'react';
import { useFormState } from 'react-hook-form';
import { Flex, Table, Text } from '@radix-ui/themes';
import { Item } from '@/app/schemas/items';
import { ErrorMessage } from '@hookform/error-message';
import { Checkbox } from './checkbox';
import { stripEntityName } from '../utils/strip-entity-name';
import { EntityImage } from './entity-image';
import { useCalculatorScaling } from '../hooks/point-calculator/use-calculator-scaling';
import { ValidationError } from './validation-error';
import { RankCalculatorSchema } from '../[player]/submit-rank-calculator-validation';

interface ItemProps {
  acquired: boolean;
  item: Item;
}

export const MemoisedItem = memo(({ item, acquired }: ItemProps) => {
  const scaling = useCalculatorScaling();
  const scaledItemPoints = Math.floor(item.points * scaling);
  const { errors } = useFormState<RankCalculatorSchema>();
  const fieldName = `acquiredItems.${stripEntityName(item.name)}` as const;

  return (
    <Table.Row key={item.name} align="center">
      <Table.Cell>
        <Flex align="center" gap="2">
          <EntityImage
            alt={`${item.name} icon`}
            src={item.image}
            fallback="?"
          />
          <Text>{item.name}</Text>
        </Flex>
        <ErrorMessage
          errors={errors}
          name={fieldName}
          render={ValidationError}
        />
      </Table.Cell>
      <Table.Cell align="right">
        <Checkbox checked={acquired} name={fieldName} />
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
