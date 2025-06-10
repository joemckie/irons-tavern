import { Flex, Progress, Separator, Text } from '@radix-ui/themes';
import Image from 'next/image';
import { useFormContext } from 'react-hook-form';
import { tavernDiaryTierNameByMultiplier } from '@/config/tavern-diaries';
import { DataCard } from '../data-card';
import { EditableText } from '../editable-text';
import { useCollectionLogPointCalculator } from '../../hooks/point-calculator/collection-log/use-collection-log-point-calculator';
import { formatPercentage } from '../../utils/format-percentage';
import { getPointsRemainingLabel } from '../../utils/get-points-remaining-label';
import { formatNumber } from '../../utils/format-number';
import { RankCalculatorSchema } from '../../[player]/submit-rank-calculator-validation';

export function CollectionLogCard() {
  const {
    pointsAwarded,
    pointsAwardedPercentage,
    pointsRemaining,
    collectionLogSlotPoints,
    bonusMultiplier,
    bonusPointsAwarded,
  } = useCollectionLogPointCalculator();
  const {
    getValues,
    formState: { defaultValues },
  } = useFormContext<RankCalculatorSchema>();
  const collectionLogTotal = getValues('collectionLogTotal');

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
              unoptimized
            />
            <Text role="heading" weight="medium" size="2">
              Collection Log
            </Text>
          </Flex>
        }
        right={
          <Text
            aria-label="Total collection log points"
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
            Slots
          </Text>
        }
        center={
          <EditableText
            aria-label="Collection log count"
            name="collectionLogCount"
            type="number"
            required
            min={0}
            max={collectionLogTotal}
            defaultValue={defaultValues?.collectionLogCount}
            readOnly
          />
        }
        right={
          <Text aria-label="Collection log slot points" color="gray" size="2">
            {formatNumber(collectionLogSlotPoints)}
          </Text>
        }
      />
      <DataCard.Row
        left={
          <Text color="gray" size="2">
            Tavern diary tier
          </Text>
        }
        center={
          <Text aria-label="Collection log diary tier" size="2">
            {tavernDiaryTierNameByMultiplier[bonusMultiplier] ?? 'None'}
          </Text>
        }
        right={
          <Text aria-label="Collection log point bonus multiplier" size="2">
            {bonusMultiplier ? `+${formatNumber(bonusPointsAwarded)}` : '-'}
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
            {formatPercentage(pointsAwardedPercentage)}
          </Text>
        }
        right={
          <Text
            aria-label="Collection log points remaining"
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
