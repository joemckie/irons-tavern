import { DataList } from '@radix-ui/themes';
import { useGetItems } from '../hooks/use-get-items';
import { useWatch } from 'react-hook-form';
import { FormData } from '../page';

export function ItemStatistics() {
  const { data } = useGetItems();
  const itemFields = useWatch<Pick<FormData, 'items'>>({
    name: 'items',
  });

  const { totalItems, itemPoints, totalPoints } = data.reduce(
    (acc, [, { items }]) => {
      const totalItems = acc.totalItems + items.length;
      const { categoryItemPointMap, categoryTotalPoints } = items.reduce(
        (acc, val) => {
          return {
            categoryItemPointMap: {
              ...acc.categoryItemPointMap,
              [val.name.replaceAll("'", '')]: val.points,
            },
            categoryTotalPoints: acc.categoryTotalPoints + val.points,
          };
        },
        {
          categoryItemPointMap: {},
          categoryTotalPoints: 0,
        },
      );

      return {
        totalPoints: acc.totalPoints + categoryTotalPoints,
        totalItems,
        itemPoints: {
          ...acc.itemPoints,
          ...categoryItemPointMap,
        },
      };
    },
    {
      totalPoints: 0,
      totalItems: 0,
      itemPoints: {} as Record<string, number>,
    },
  );

  const filteredItemFields = Object.entries(itemFields).filter(
    ([, value]) => !!value,
  );
  const itemsCollected = filteredItemFields.length;
  const percentageCollected = (itemsCollected / totalItems) * 100;
  const pointsAwarded = filteredItemFields.reduce(
    (acc, [item]) => acc + itemPoints[item],
    0,
  );
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
