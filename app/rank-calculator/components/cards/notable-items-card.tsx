import { Flex, Progress, Separator, Text } from '@radix-ui/themes';
import Image from 'next/image';
import { DataCard } from '../data-card';
import { useNotableItemsPointCalculator } from '../../hooks/point-calculator/use-notable-items-point-calculator';

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
            />
            <Text weight="bold" size="2">
              Notable items
            </Text>
          </Flex>
        }
        right={
          <Text aria-label="Total notable items points" weight="bold" size="2">
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
          <Text aria-label="Notable items collected" color="gray" size="2">
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
          <Text
            aria-label="Total notable items available"
            color="gray"
            size="2"
          >
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
          <Text
            aria-label="Notable items collected percentage"
            color="gray"
            size="2"
          >
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
        center={
          <Text aria-label="Notable items point completion percentage" size="2">
            {pointsAwardedPercentage.toFixed(2)}%
          </Text>
        }
        right={
          <Text
            aria-label="Notable items points remaining"
            color="gray"
            size="2"
          >
            ({pointsRemaining})
          </Text>
        }
      />
      <Progress size="3" value={pointsAwardedPercentage} />
    </DataCard.Root>
  );
}
