import { forwardRef, memo } from 'react';
import {
  Avatar,
  Box,
  Card,
  Flex,
  Separator,
  Table,
  Text,
} from '@radix-ui/themes';
import { useWatch } from 'react-hook-form';
import { Item } from '@/types/items';
import { parseInitials } from '../utils/parse-initials';
import { formatWikiImageUrl } from '../utils/format-wiki-url';
import { MemoisedItem } from './item';
import { stripEntityName } from '../utils/strip-entity-name';

interface CategoryProps {
  title: string;
  image?: string;
  items: Item[];
}

export const Category = memo(
  forwardRef<HTMLDivElement | null, CategoryProps>(
    ({ title, items, image = formatWikiImageUrl(title) }, ref) => {
      const fields = useWatch<Record<string, true | undefined>>({
        name: items.map(({ name }) => `items.${stripEntityName(name)}`),
      });
      const completedCount = fields.filter(Boolean).length;
      const percentComplete = ((completedCount / items.length) * 100).toFixed(
        0,
      );

      return (
        <Card ref={ref} mb="3">
          <Flex justify="between" align="center">
            <Flex gap="3">
              <Avatar size="3" src={image} fallback={parseInitials(title)} />
              <Box>
                <Text as="div" size="2" weight="bold">
                  {title}
                </Text>
                <Text as="div" size="2" color="gray">
                  {completedCount} / {items.length}
                </Text>
              </Box>
            </Flex>
            <Text
              color={percentComplete === '100' ? 'green' : undefined}
              weight="bold"
              size="4"
            >
              {percentComplete}%
            </Text>
          </Flex>
          <Separator
            size="4"
            my="3"
            style={{ backgroundColor: 'var(--accent-a4)' }}
          />
          <Table.Root size="1">
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeaderCell>Item name</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell align="right">
                  Acquired?
                </Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell width="100px" align="right">
                  Points
                </Table.ColumnHeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {items.map((item, i) => (
                <MemoisedItem
                  acquired={!!fields[i]}
                  key={item.name}
                  item={item}
                />
              ))}
            </Table.Body>
          </Table.Root>
        </Card>
      );
    },
  ),
);

Category.displayName = 'Category';
