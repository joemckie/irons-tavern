import { memo, useMemo } from 'react';
import { useFormState, useWatch } from 'react-hook-form';
import { Flex, Table, Text } from '@radix-ui/themes';
import { Item } from '@/app/schemas/items';
import { ErrorMessage } from '@hookform/error-message';
import { Checkbox } from './checkbox';
import { stripEntityName } from '../utils/strip-entity-name';
import { EntityImage } from './entity-image';
import { useCalculatorScaling } from '../hooks/point-calculator/use-calculator-scaling';
import { isItemAcquired } from '../data-sources/fetch-player-details/utils/is-item-acquired';
import { RankCalculatorSchema } from '../[player]/submit-rank-calculator-validation';
import { ValidationError } from './validation-error';

interface AutomaticItemProps {
  item: Item;
}

export const MemoisedAutomaticItem = memo(({ item }: AutomaticItemProps) => {
  const scaling = useCalculatorScaling();
  const scaledItemPoints = Math.floor(item.points * scaling);
  const { errors, disabled } = useFormState<RankCalculatorSchema>();
  const achievementDiaries = useWatch<
    RankCalculatorSchema,
    'achievementDiaries'
  >({ name: 'achievementDiaries' });
  const totalLevel = useWatch<RankCalculatorSchema, 'totalLevel'>({
    name: 'totalLevel',
  });
  const acquiredItems = useWatch<RankCalculatorSchema, 'acquiredItems'>({
    name: 'acquiredItems',
  });

  // If the form is in read-only mode, take the value from the form data
  // else determine it from the user input
  const isAcquired = useMemo(
    () =>
      disabled
        ? !!acquiredItems[stripEntityName(item.name)]
        : isItemAcquired(item, {
            achievementDiaries,
            acquiredItems: Object.fromEntries(
              Object.entries(acquiredItems).map(([key, value]) => [
                key,
                Number(value),
              ]),
            ),
            totalLevel,
          }),
    [achievementDiaries, acquiredItems, disabled, item, totalLevel],
  );

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
        <Checkbox disabled checked={isAcquired} name={fieldName} />
      </Table.Cell>
      <Table.Cell
        aria-label={`${item.name} points`}
        align="right"
        width="100px"
      >
        {`${isAcquired ? scaledItemPoints : 0} / ${scaledItemPoints}`}
      </Table.Cell>
    </Table.Row>
  );
});

MemoisedAutomaticItem.displayName = 'MemoisedAutomaticItem';
