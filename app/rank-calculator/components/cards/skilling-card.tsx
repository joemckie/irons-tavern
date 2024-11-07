import { Flex, Progress, Separator, Text } from '@radix-ui/themes';
import {
  DiaryLocation,
  DiaryTier,
  maximumTotalLevel,
  minimumTotalLevel,
} from '@/app/schemas/osrs';
import Image from 'next/image';
import { DataCard } from '../data-card';
import { Select } from '../select';
import { EditableText } from '../editable-text';
import { useSkillingPointCalculator } from '../../hooks/point-calculator/skilling/use-skilling-point-calculator';
import { formatPercentage } from '../../utils/format-percentage';
import { getPointsRemainingLabel } from '../../utils/get-points-remaining-label';
import { formatNumber } from '../../utils/format-number';

export function SkillingCard() {
  const {
    pointsAwarded,
    pointsAwardedPercentage,
    pointsRemaining,
    totalLevelPoints,
    achievementDiariesPoints,
    ehpPoints,
  } = useSkillingPointCalculator();

  return (
    <DataCard.Root>
      <DataCard.Row
        left={
          <Flex gap="2" align="center">
            <Image
              alt="Skills icon"
              src="/icons/skills.png"
              height={18}
              width={18}
            />
            <Text role="heading" weight="bold" size="2">
              Skilling
            </Text>
          </Flex>
        }
        right={
          <Text aria-label="Total skilling points" weight="bold" size="2">
            {formatNumber(pointsAwarded)}
          </Text>
        }
      />
      <Separator size="4" />
      <DataCard.Row
        left={
          <Text color="gray" size="2">
            EHP
          </Text>
        }
        center={
          <EditableText
            aria-label="Efficient hours played value"
            name="ehp"
            required
            type="number"
          />
        }
        right={
          <Text
            aria-label="Efficient hours played points"
            color="gray"
            size="2"
          >
            {formatNumber(ehpPoints)}
          </Text>
        }
      />
      <DataCard.Row
        left={
          <Text color="gray" size="2">
            Total level
          </Text>
        }
        center={
          <EditableText
            aria-label="Total level value"
            name="totalLevel"
            required
            type="number"
            min={minimumTotalLevel}
            max={maximumTotalLevel}
          />
        }
        right={
          <Text aria-label="Total level points" color="gray" size="2">
            {formatNumber(totalLevelPoints)}
          </Text>
        }
      />
      {DiaryLocation.options.map((location) => (
        <DataCard.Row
          key={location}
          left={
            <Text color="gray" size="2">
              {location}
            </Text>
          }
          center={
            <Select
              aria-label={`${location} diary value`}
              name={`achievementDiaries.${location}`}
              placeholder="Choose a tier"
              options={DiaryTier.options}
            />
          }
          right={
            <Text aria-label={`${location} diary points`} color="gray" size="2">
              {formatNumber(achievementDiariesPoints[location])}
            </Text>
          }
        />
      ))}
      <DataCard.Row
        left={
          <Text color="gray" size="2">
            Progress
          </Text>
        }
        center={
          <Text aria-label="Skilling point completion percentage" size="2">
            {formatPercentage(pointsAwardedPercentage)}
          </Text>
        }
        right={
          <Text aria-label="Skilling points remaining" color="gray" size="2">
            {getPointsRemainingLabel(pointsRemaining)}
          </Text>
        }
      />
      <Progress size="3" value={pointsAwardedPercentage * 100} />
    </DataCard.Root>
  );
}
