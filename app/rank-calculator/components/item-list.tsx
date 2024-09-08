import { ItemsResponse } from '@/types/rank-calculator';
import { useFormContext } from 'react-hook-form';
import Image from 'next/image';

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
        <h1>{category}</h1>
        {items.map(({ image, name, requiredItems }) => (
          <div key={name}>
            <h2>{name}</h2>
            <Image
              alt={`${name} icon`}
              src={image || 'https://placehold.co/66x66.png'}
              height={66}
              width={66}
            />
            {requiredItems.map(({ clogName }) => {
              return (
                <input
                  key={clogName}
                  type="checkbox"
                  {...register(`items.${name}`)}
                />
              );
            })}
          </div>
        ))}
      </div>
    );
  });
}
