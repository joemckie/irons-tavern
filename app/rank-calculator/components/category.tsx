import { Item } from '@/types/rank-calculator';
import {
  Avatar,
  Box,
  Card,
  Flex,
  Grid,
  Section,
  Separator,
  Table,
  Text,
} from '@radix-ui/themes';
import { Checkbox } from './checkbox';
import { useWatch } from 'react-hook-form';
import { Label } from '@radix-ui/react-label';

interface CategoryProps {
  title: string;
  image: string;
  items: Item[];
}

export function Category({ title, items, image }: CategoryProps) {
  const fields = useWatch<Record<string, true | undefined>>({
    name: items.map(({ name }) => `items.${name.replaceAll("'", '')}`),
  });

  return (
    <Card>
      <Flex gap="3" align="center">
        <Avatar size="3" src={image} radius="full" fallback="T" />
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
      <Grid columns={{ initial: '1', sm: '2', lg: '3' }} gap="3">
        {items.map(({ image, name, points }, i) => (
          <Card key={name} size="2" asChild>
            <Label>
              <Flex align="center" direction="row" gap="3">
                <Avatar
                  alt={`${name} icon`}
                  size="2"
                  src={image}
                  variant="soft"
                  fallback="?"
                />
                <Flex direction="column" width="100%">
                  <Text weight="bold" size="2">
                    {name}
                  </Text>
                  <Text size="1">
                    {fields[i] ? points : 0} / {points} points
                  </Text>
                </Flex>
                <Checkbox name={`items.${name.replaceAll("'", '')}`} />
              </Flex>
            </Label>
          </Card>
        ))}
      </Grid>
      {/* <Table.Root size="1" variant="surface">
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
                <Checkbox name={`items.${name.replaceAll("'", '')}`} />
              </Table.Cell>
              <Table.Cell>{fields[i] ? points : 0}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root> */}
    </Card>
  );
}
