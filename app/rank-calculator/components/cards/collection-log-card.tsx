import { Flex, Progress, Separator, Text } from '@radix-ui/themes';
import Image from 'next/image';
import { DataCard } from '../data-card';
import { EditableText } from '../editable-text';
import { useCollectionLogPointCalculator } from '../../hooks/point-calculator/collection-log/use-collection-log-point-calculator';

export function CollectionLogCard() {
  const {
    pointsAwarded,
    pointsAwardedPercentage,
    pointsRemaining,
    collectionLogSlotPoints,
  } = useCollectionLogPointCalculator();

  return (
    <DataCard.Root>
      <DataCard.Row
        left={
          <Flex gap="2" align="center">
            <Image
              alt="Collection log icon"
              src="/icons/collection-log.png"
              height={17}
              width={18}
            />
            <Text role="heading" weight="bold" size="2">
              Collection Log
            </Text>
          </Flex>
        }
        right={
          <Text aria-label="Total collection log points" weight="bold" size="2">
            {pointsAwarded}
          </Text>
        }
      />
      <Separator size="4" />
      <DataCard.Row
        left={
          <Text color="gray" size="2">
            Slots
          </Text>
        }
        center={
          <EditableText
            aria-label="Collection log count"
            name="collectionLogCount"
            type="number"
            required
          />
        }
        right={
          <Text aria-label="Collection log slot points" color="gray" size="2">
            {collectionLogSlotPoints}
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
          <Text
            aria-label="Collection log point completion percentage"
            size="2"
          >
            {`${pointsAwardedPercentage.toFixed(2)}%`}
          </Text>
        }
        right={
          <Text
            aria-label="Collection log points remaining"
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
