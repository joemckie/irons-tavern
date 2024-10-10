import { Item } from '@/types/rank-calculator';
import {
  Avatar,
  Box,
  Card,
  Flex,
  Separator,
  Table,
  Text,
} from '@radix-ui/themes';
import { Checkbox } from './checkbox';
import { useWatch } from 'react-hook-form';

interface CategoryProps {
  title: string;
  items: Item[];
}

export function Category({ title, items }: CategoryProps) {
  const fields = useWatch({
    name: items.map(({ name }) => `items.${name}`),
  });

  return (
    <Card>
      <Flex gap="3" align="center">
        <Avatar
          size="3"
          src="https://placehold.co/66x66.png"
          radius="full"
          fallback="T"
        />
        <Box>
          <Text as="div" size="2" weight="bold">
            {title}
          </Text>
          <Text as="div" size="2" color="gray">
            {fields.filter(Boolean).length} / {items.length}
          </Text>
        </Box>
      </Flex>
      <Separator size="4" my="3" />
      <Table.Root size="1">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Item name</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Points Available</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Acquired?</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Points Awarded</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {items.map(({ image, name, points }, i) => (
            <Table.Row key={name} align="center">
              <Table.Cell>
                <Flex align="center" gap="2">
                  <Avatar
                    alt={`${name} icon`}
                    size="2"
                    src={image}
                    variant="soft"
                    fallback="?"
                  />
                  <Text>{name}</Text>
                </Flex>
              </Table.Cell>
              <Table.Cell>{points}</Table.Cell>
              <Table.Cell>
                <Checkbox name={`items.${name}`} />
              </Table.Cell>
              <Table.Cell>{fields[i] ? points : 0}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Card>
  );
}
