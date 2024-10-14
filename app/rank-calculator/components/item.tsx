import { Item } from '@/types/rank-calculator';
import { Avatar, Flex, Table, Text } from '@radix-ui/themes';
import { memo } from 'react';
import { Checkbox } from './checkbox';
import { stripEntityName } from '../utils/strip-entity-name';

interface ItemProps {
  acquired: boolean;
  item: Item;
}

export const MemoisedItem = memo(({ item, acquired }: ItemProps) => (
  <Table.Row key={item.name} align="center">
    <Table.Cell>
      <Flex align="center" gap="2">
        <Avatar
          alt={`${item.name} icon`}
          size="2"
          src={item.image}
          variant="soft"
          fallback="?"
        />
        <Text>{item.name}</Text>
      </Flex>
    </Table.Cell>
    <Table.Cell align="right">
      <Checkbox
        defaultChecked={acquired}
        name={`items.${stripEntityName(item.name)}`}
      />
    </Table.Cell>
    <Table.Cell align="right" width="100px">
      {acquired ? item.points : 0} / {item.points}
    </Table.Cell>
  </Table.Row>
));

MemoisedItem.displayName = 'MemoisedItem';
