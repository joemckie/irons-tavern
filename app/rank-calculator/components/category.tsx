import { Item, ItemCategory } from '@/types/rank-calculator';
import {
  Avatar,
  Box,
  Card,
  Flex,
  Grid,
  Separator,
  Table,
  Text,
} from '@radix-ui/themes';
import { Checkbox } from './checkbox';
import { useWatch } from 'react-hook-form';
import { Label } from '@radix-ui/react-label';
import { formatWikiImageUrl } from '../utils/format-wiki-url';
import { parseInitials } from '../utils/parse-initials';
import { forwardRef, memo, useEffect, useRef } from 'react';
import { areEqual, ListChildComponentProps } from 'react-window';
import { flexPropDefs } from '@radix-ui/themes/props';

interface CategoryProps {
  title: string;
  image?: string;
  items: Item[];
  layout?: 'table' | 'cards';
}

export const Category = forwardRef<HTMLDivElement | null, CategoryProps>(
  function Category(
    {
      title,
      items,
      image = formatWikiImageUrl(title),
      layout = 'table',
    }: CategoryProps,
    ref,
  ) {
    const fields = useWatch<Record<string, true | undefined>>({
      name: items.map(({ name }) => `items.${name.replaceAll("'", '')}`),
    });
    const completedCount = fields.filter(Boolean).length;
    const percentComplete = ((completedCount / items.length) * 100).toFixed(0);

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
        {layout === 'cards' && (
          <Grid columns={{ initial: '1', sm: '2', lg: '4' }} gap="3">
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
        )}
        {layout === 'table' && (
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
                  <Table.Cell align="right">
                    <Checkbox name={`items.${name.replaceAll("'", '')}`} />
                  </Table.Cell>
                  <Table.Cell align="right" width="100px">
                    {fields[i] ? points : 0} / {points}
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
        )}
      </Card>
    );
  },
);

export const MemoisedCategory = memo(
  ({
    style,
    index,
    data,
    setSize,
  }: ListChildComponentProps<[string, ItemCategory][]> & {
    setSize: (index: number, size: number) => void;
  }) => {
    const [title, category] = data[index];
    const elementRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (elementRef.current) {
        const size =
          elementRef.current.getBoundingClientRect().height +
          parseInt(
            window
              .getComputedStyle(elementRef.current)
              .getPropertyValue('margin-bottom'),
            10,
          );

        setSize(index, size);
      }
    }, [setSize]);

    return (
      <Box style={style}>
        <Category
          ref={elementRef}
          title={title}
          items={category.items}
          image={category.image}
          key={title}
        />
      </Box>
    );
  },
  areEqual,
);
