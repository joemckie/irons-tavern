import { Flex, Progress, Separator, Text } from '@radix-ui/themes';
import Image from 'next/image';
import { DataCard } from '../data-card';
import { useNotableItemsPointCalculator } from '../../hooks/point-calculator/notable-items/use-notable-items-point-calculator';
import { formatPercentage } from '../../utils/format-percentage';
import { getPointsRemainingLabel } from '../../utils/get-points-remaining-label';
import { formatNumber } from '../../utils/format-number';

export function NotableItemsCard() {
  const {
    pointsAwarded,
    pointsAwardedPercentage,
    pointsRemaining,
    percentageCollected,
    itemsCollected,
    totalItems,
  } = useNotableItemsPointCalculator();

  return (
    <DataCard.Root>
      <DataCard.Row
        left={
          <Flex gap="2" align="center">
            <Image
              alt="Inventory icon"
              src="/icons/inventory.png"
              height={18}
              width={18}
              unoptimized
            />
            <Text role="heading" weight="medium" size="2">
              Notable items
            </Text>
          </Flex>
        }
        right={
          <Text
            aria-label="Total notable items points"
            weight="medium"
            size="2"
          >
            {formatNumber(pointsAwarded)}
          </Text>
        }
      />
      <Separator size="4" />
      <DataCard.Row
        left={
          <Text color="gray" weight="medium" size="2">
            Category
          </Text>
        }
        right={
          <Text color="gray" weight="medium" size="2">
            Points
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
          <Text aria-label="Notable items collected" color="gray" size="2">
            {formatNumber(itemsCollected)}
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
          <Text
            aria-label="Total notable items available"
            color="gray"
            size="2"
          >
            {formatNumber(totalItems)}
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
          <Text
            aria-label="Notable items collected percentage"
            color="gray"
            size="2"
          >
            {formatPercentage(percentageCollected)}
          </Text>
        }
      />
      <DataCard.Row
        left={
          <Text color="gray" size="2">
            Progress
          </Text>
        }
        center={
          <Text aria-label="Notable items point completion percentage" size="2">
            {formatPercentage(pointsAwardedPercentage)}
          </Text>
        }
        right={
          <Text
            aria-label="Notable items points remaining"
            color="gray"
            size="2"
          >
            {getPointsRemainingLabel(pointsRemaining)}
          </Text>
        }
      />
      <Progress size="3" value={pointsAwardedPercentage * 100} />
    </DataCard.Root>
  );
}
