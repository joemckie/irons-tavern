import { Flex, Progress, Separator, Text } from '@radix-ui/themes';
import Image from 'next/image';
import { useFormState } from 'react-hook-form';
import { CombatAchievementTier } from '@/app/schemas/osrs';
import { ErrorMessage } from '@hookform/error-message';
import { DataCard } from '../data-card';
import { Select } from '../select';
import { EditableText } from '../editable-text';
import { useCombatPointCalculator } from '../../hooks/point-calculator/combat/use-combat-point-calculator';
import { formatPercentage } from '../../utils/format-percentage';
import { getPointsRemainingLabel } from '../../utils/get-points-remaining-label';
import { formatNumber } from '../../utils/format-number';
import { RankCalculatorSchema } from '../../[player]/submit-rank-calculator-validation';
import { ValidationError } from '../validation-error';

export function CombatCard() {
  const {
    pointsAwarded,
    pointsAwardedPercentage,
    pointsRemaining,
    combatAchievementTierPoints,
    ehbPoints,
  } = useCombatPointCalculator();
  const { defaultValues, errors } = useFormState<RankCalculatorSchema>();

  return (
    <DataCard.Root>
      <DataCard.Row
        left={
          <Flex gap="2" align="center">
            <Image
              alt="Combat icon"
              src="/icons/combat.png"
              height={18}
              width={18}
            />
            <Text role="heading" weight="medium" size="2">
              Combat
            </Text>
          </Flex>
        }
        right={
          <Text aria-label="Total combat points" weight="medium" size="2">
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
            EHB
          </Text>
        }
        center={
          <EditableText
            aria-label="Efficient hours bossed value"
            name="ehb"
            type="number"
            required
            min={0}
            defaultValue={defaultValues?.ehb}
          />
        }
        right={
          <Text
            aria-label="Efficient hours bossed points"
            color="gray"
            size="2"
          >
            {formatNumber(ehbPoints)}
          </Text>
        }
      />
      <ErrorMessage errors={errors} name="ehb" render={ValidationError} />
      <DataCard.Row
        left={
          <Text color="gray" size="2">
            CA Tier
          </Text>
        }
        center={
          <Select
            aria-label="Combat achievement tier value"
            name="combatAchievementTier"
            placeholder="Choose a tier"
            options={CombatAchievementTier.options}
          />
        }
        right={
          <Text
            aria-label="Combat achievement tier points"
            color="gray"
            size="2"
          >
            {formatNumber(combatAchievementTierPoints)}
          </Text>
        }
      />
      <ErrorMessage
        errors={errors}
        name="combatAchievementTier"
        render={ValidationError}
      />
      <DataCard.Row
        left={
          <Text color="gray" size="2">
            Progress
          </Text>
        }
        center={
          <Text aria-label="Combat point completion percentage" size="2">
            {formatPercentage(pointsAwardedPercentage)}
          </Text>
        }
        right={
          <Text aria-label="Combat points remaining" color="gray" size="2">
            {getPointsRemainingLabel(pointsRemaining)}
          </Text>
        }
      />
      <Progress size="3" value={pointsAwardedPercentage * 100} />
    </DataCard.Root>
  );
}
