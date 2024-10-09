import { ItemsResponse } from '@/types/rank-calculator';
import { useFormContext } from 'react-hook-form';
import Image from 'next/image';
import { Checkbox, Text } from '@radix-ui/themes';

interface ItemListProps {
  items: ItemsResponse | undefined;
}

export function ItemList({ items }: ItemListProps) {
  const { register } = useFormContext();

  if (!items) {
    return null;
  }

  return Object.entries(items).map(([category, items]) => {
    return (
      <div key={category}>
        <Text>{category}</Text>
        {items.map(({ image, name, requiredItems }) => (
          <div key={name}>
            <Text>{name}</Text>
            <Image
              alt={`${name} icon`}
              src={image || 'https://placehold.co/66x66.png'}
              height={66}
              width={66}
            />
            {requiredItems.map(({ clogName }) => {
              return <Checkbox key={clogName} {...register(`items.${name}`)} />;
            })}
          </div>
        ))}
      </div>
    );
  });
}
