import { Flex, Progress, Separator, Text } from '@radix-ui/themes';
import { DiaryLocation, DiaryTier } from '@/types/osrs';
import Image from 'next/image';
import { DataCard } from '../data-card';
import { Select } from '../select';
import { EditableText } from '../editable-text';
import { useSkillingPointCalculator } from '../../hooks/point-calculator/skilling/use-skilling-point-calculator';

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
            {pointsAwarded}
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
            {ehpPoints}
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
          />
        }
        right={
          <Text aria-label="Total level points" color="gray" size="2">
            {totalLevelPoints}
          </Text>
        }
      />
      {Object.keys(DiaryLocation).map((location) => (
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
              options={Object.values(DiaryTier)}
            />
          }
          right={
            <Text aria-label={`${location} diary points`} color="gray" size="2">
              {achievementDiariesPoints[location as DiaryLocation]}
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
            {`${pointsAwardedPercentage.toFixed(2)}%`}
          </Text>
        }
        right={
          <Text aria-label="Skilling points remaining" color="gray" size="2">
            ({pointsRemaining})
          </Text>
        }
      />
      <Progress size="3" value={pointsAwardedPercentage} />
    </DataCard.Root>
  );
}
