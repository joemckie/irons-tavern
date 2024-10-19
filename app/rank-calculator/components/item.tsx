import { memo } from 'react';
import { Flex, Table, Text } from '@radix-ui/themes';
import { Item } from '@/types/items';
import { Checkbox } from './checkbox';
import { stripEntityName } from '../utils/strip-entity-name';
import { EntityImage } from './entity-image';

interface ItemProps {
  acquired: boolean;
  item: Item;
}

export const MemoisedItem = memo(({ item, acquired }: ItemProps) => (
  <Table.Row key={item.name} align="center">
    <Table.Cell>
      <Flex align="center" gap="2">
        <EntityImage alt={`${item.name} icon`} src={item.image} />
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
