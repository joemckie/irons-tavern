import { Progress, Separator, Text } from '@radix-ui/themes';
import { useWatch } from 'react-hook-form';
import { useGetItems } from '../hooks/use-get-items';
import { DataCard } from './data-card';

export function ItemStatistics() {
  const { data } = useGetItems();
  const itemFields = useWatch<Record<string, boolean>>({
    name: 'items',
  });

  const { totalItems, itemPoints, totalPoints } = data.reduce(
    (acc, [, { items }]) => {
      const { categoryItemPointMap, categoryTotalPoints } = items.reduce(
        (categoryAcc, val) => ({
          categoryItemPointMap: {
            ...categoryAcc.categoryItemPointMap,
            [val.name.replaceAll("'", '')]: val.points,
          },
          categoryTotalPoints: categoryAcc.categoryTotalPoints + val.points,
        }),
        {
          categoryItemPointMap: {},
          categoryTotalPoints: 0,
        },
      );

      return {
        totalPoints: acc.totalPoints + categoryTotalPoints,
        totalItems: acc.totalItems + items.length,
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

  const filteredItemFields = itemFields
    ? Object.entries(itemFields).filter(([, value]) => !!value)
    : [];
  const itemsCollected = filteredItemFields.length;
  const percentageCollected = (itemsCollected / totalItems) * 100;
  const pointsAwarded = filteredItemFields.reduce(
    (acc, [item]) => acc + itemPoints[item],
    0,
  );
  const percentagePointsAchieved = (pointsAwarded / totalPoints) * 100;

  return (
    <DataCard.Root>
      <DataCard.Row
        left={
          <Text weight="bold" size="2">
            Notable items
          </Text>
        }
        right={
          <Text weight="bold" size="2">
            {pointsAwarded}
          </Text>
        }
      />
      <Separator size="4" />
      <DataCard.Row
        left={
          <Text color="gray" size="2">
            Items collected
          </Text>
        }
        right={
          <Text color="gray" size="2">
            {itemsCollected}
          </Text>
        }
      />
      <DataCard.Row
        left={
          <Text color="gray" size="2">
            Total items available
          </Text>
        }
        right={
          <Text color="gray" size="2">
            {totalItems}
          </Text>
        }
      />
      <DataCard.Row
        left={
          <Text color="gray" size="2">
            Items collected
          </Text>
        }
        right={
          <Text color="gray" size="2">
            {percentageCollected.toFixed(2)}%
          </Text>
        }
      />
      <DataCard.Row
        left={
          <Text color="gray" size="2">
            Progress
          </Text>
        }
        center={<Text size="2">{percentagePointsAchieved.toFixed(2)}%</Text>}
        right={
          <Text color="gray" size="2">
            ({totalPoints - pointsAwarded})
          </Text>
        }
      />
      <Progress size="3" value={percentagePointsAchieved} />
    </DataCard.Root>
  );
}
