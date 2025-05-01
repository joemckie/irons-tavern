import { Flex, Progress, Separator, Text } from '@radix-ui/themes';
import {
  DiaryLocation,
  DiaryTier,
  maximumTotalLevel,
  minimumTotalLevel,
} from '@/app/schemas/osrs';
import Image from 'next/image';
import { useFormContext } from 'react-hook-form';
import { DataCard } from '../data-card';
import { Select } from '../select';
import { EditableText } from '../editable-text';
import { useSkillingPointCalculator } from '../../hooks/point-calculator/skilling/use-skilling-point-calculator';
import { formatPercentage } from '../../utils/format-percentage';
import { getPointsRemainingLabel } from '../../utils/get-points-remaining-label';
import { formatNumber } from '../../utils/format-number';
import { RankCalculatorSchema } from '../../[player]/submit-rank-calculator-validation';
import { ValidationTooltip } from '../validation-tooltip';
import { Checkbox } from '../checkbox';
// import { Input } from '../input';

export function SkillingCard() {
  const {
    pointsAwarded,
    pointsAwardedPercentage,
    pointsRemaining,
    totalLevelPoints,
    achievementDiariesPoints,
    ehpPoints,
    achievementDiaryCapePoints,
    maxCapePoints,
  } = useSkillingPointCalculator();
  const {
    formState: { defaultValues, errors },
    getValues,
    // register,
  } = useFormContext<RankCalculatorSchema>();
  const [hasAchievementDiaryCape, hasMaxCape] = getValues([
    'hasAchievementDiaryCape',
    'hasMaxCape',
  ]);

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
              unoptimized
            />
            <Text role="heading" weight="medium" size="2">
              Skilling
            </Text>
          </Flex>
        }
        right={
          <Text aria-label="Total skilling points" weight="medium" size="2">
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
            EHP
          </Text>
        }
        center={
          <EditableText
            aria-label="Efficient hours played value"
            name="ehp"
            required
            type="number"
            min={0}
            defaultValue={defaultValues?.ehp}
            readOnly
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
            defaultValue={defaultValues?.totalLevel}
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
          <ValidationTooltip
            error={errors.hasAchievementDiaryCape}
            color="gray"
            size="2"
          >
            <Text>Diary cape</Text>
          </ValidationTooltip>
        }
        center={
          <Checkbox
            name="hasAchievementDiaryCape"
            checked={hasAchievementDiaryCape}
          />
        }
        right={
          <Text
            aria-label="Achievement diary cape points"
            color="gray"
            size="2"
          >
            {formatNumber(achievementDiaryCapePoints)}
          </Text>
        }
      />
      <DataCard.Row
        left={
          <ValidationTooltip error={errors.hasMaxCape} color="gray" size="2">
            <Text>Max cape</Text>
          </ValidationTooltip>
        }
        center={<Checkbox name="hasMaxCape" checked={hasMaxCape} />}
        right={
          <Text aria-label="Max cape points" color="gray" size="2">
            {formatNumber(maxCapePoints)}
          </Text>
        }
      />
      {/* <DataCard.Row
        left={
          <Text color="gray" size="2">
            Multiplier
          </Text>
        }
        center={
          <Input
            {...register('skillingBonusMultiplier', {
              valueAsNumber: true,
              min: 0,
            })}
            hasError={false}
            type="number"
            size="1"
            min={0}
          />
        }
        right={null}
      /> */}
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
