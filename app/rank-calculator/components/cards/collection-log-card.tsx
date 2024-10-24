import { Flex, Progress, Separator, Text } from '@radix-ui/themes';
import Image from 'next/image';
import { DataCard } from '../data-card';
import { EditableText } from '../editable-text';
import { usePointCalculator } from '../../hooks/use-point-calculator';

export function CollectionLogCard() {
  const { collectionLogSlotPoints } = usePointCalculator();

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
            <Text weight="bold" size="2">
              Collection Log
            </Text>
          </Flex>
        }
        right={
          <Text aria-label="Total collection log points" weight="bold" size="2">
            11440
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
          <EditableText name="collectionLogCount" type="number" required />
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
            40%
          </Text>
        }
        right={
          <Text
            aria-label="Collection log points remaining"
            color="gray"
            size="2"
          >
            (30000)
          </Text>
        }
      />
      <Progress size="3" value={40} />
    </DataCard.Root>
  );
}
