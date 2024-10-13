import { DataList } from '@radix-ui/themes';
import { useGetItems } from '../hooks/use-get-items';
import { useWatch } from 'react-hook-form';
import { FormData } from '../page';

export function ItemStatistics() {
  const { data } = useGetItems();
  const itemFields = useWatch<Pick<FormData, 'items'>>({
    name: 'items',
  });
  const pointsMap = Object.fromEntries(
    data.flatMap(([, { items }]) =>
      items.map((item) => [item.name.replaceAll("'", ''), item.points]),
    ),
  );
  const totalItems = data.reduce((acc, [, { items }]) => acc + items.length, 0);
  const totalPoints = Object.values(pointsMap).reduce(
    (acc, val) => acc + val,
    0,
  );

  const itemsCollected = Object.values(itemFields).filter(Boolean).length;
  const percentageCollected = (itemsCollected / totalItems) * 100;
  const pointsAwarded = Object.entries(itemFields)
    .filter(([, val]) => !!val)
    .reduce((acc, [item]) => acc + pointsMap[item], 0);
  const percentagePointsAchieved = (pointsAwarded / totalPoints) * 100;

  return (
    <DataList.Root>
      <DataList.Item>
        <DataList.Label>Total item points</DataList.Label>
        <DataList.Value>{pointsAwarded}</DataList.Value>
      </DataList.Item>
      <DataList.Item>
        <DataList.Label>Items collected</DataList.Label>
        <DataList.Value>{itemsCollected}</DataList.Value>
      </DataList.Item>
      <DataList.Item>
        <DataList.Label>Total items available</DataList.Label>
        <DataList.Value>{totalItems}</DataList.Value>
      </DataList.Item>
      <DataList.Item>
        <DataList.Label>Items collected</DataList.Label>
        <DataList.Value>{percentageCollected.toFixed(2)}%</DataList.Value>
      </DataList.Item>
      <DataList.Item>
        <DataList.Label>Points achieved (%)</DataList.Label>
        <DataList.Value>{percentagePointsAchieved.toFixed(2)}%</DataList.Value>
      </DataList.Item>
    </DataList.Root>
  );
}
