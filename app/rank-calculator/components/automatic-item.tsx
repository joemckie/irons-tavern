import { memo } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { Flex, Table, Text } from '@radix-ui/themes';
import { Item } from '@/app/schemas/items';
import { Checkbox } from './checkbox';
import { stripEntityName } from '../utils/strip-entity-name';
import { EntityImage } from './entity-image';
import { useCalculatorScaling } from '../hooks/point-calculator/use-calculator-scaling';
import { isItemAcquired } from '../data-sources/fetch-player-details/utils/is-item-acquired';
import { RankCalculatorSchema } from '../[player]/submit-rank-calculator-validation';

interface AutomaticItemProps {
  item: Item;
}

export const MemoisedAutomaticItem = memo(({ item }: AutomaticItemProps) => {
  const scaling = useCalculatorScaling();
  const scaledItemPoints = Math.floor(item.points * scaling);
  const { formState } = useFormContext<RankCalculatorSchema>();
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
  const acquired = formState.disabled
    ? !!acquiredItems[item.name]
    : isItemAcquired(item, {
        achievementDiaries,
        acquiredItems: Object.fromEntries(
          Object.entries(acquiredItems).map(([key, value]) => [
            key,
            Number(value),
          ]),
        ),
        totalLevel,
      });

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
      </Table.Cell>
      <Table.Cell align="right">
        <Checkbox
          disabled
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

MemoisedAutomaticItem.displayName = 'MemoisedAutomaticItem';
