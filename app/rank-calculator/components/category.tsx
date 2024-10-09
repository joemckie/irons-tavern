import { Item } from '@/types/rank-calculator';
import { Avatar, Box, Card, Flex, Text } from '@radix-ui/themes';
import Image from 'next/image';
import { Fragment } from 'react';
import { CheckboxField } from './checkbox';
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
    <>
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
      </Card>

      {items.map(({ image, name, requiredItems }) => (
        <Box key={name}>
          <Text>{name}</Text>
          <Image
            alt={`${name} icon`}
            src={image || 'https://placehold.co/66x66.png'}
            height={66}
            width={66}
          />
          {requiredItems.map(({ clogName }) => {
            return <CheckboxField key={clogName} name={`items.${name}`} />;
          })}
        </Box>
      ))}
    </>
  );
}
