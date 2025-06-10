import { Flex, Progress, Separator, Text } from '@radix-ui/themes';
import Image from 'next/image';
import { useFormContext } from 'react-hook-form';
import { CombatAchievementTier, TzHaarCape } from '@/app/schemas/osrs';
import { tavernDiaryTierNameByMultiplier } from '@/config/tavern-diaries';
import { DataCard } from '../data-card';
import { Select } from '../select';
import { EditableText } from '../editable-text';
import { useCombatPointCalculator } from '../../hooks/point-calculator/combat/use-combat-point-calculator';
import { formatPercentage } from '../../utils/format-percentage';
import { getPointsRemainingLabel } from '../../utils/get-points-remaining-label';
import { formatNumber } from '../../utils/format-number';
import { RankCalculatorSchema } from '../../[player]/submit-rank-calculator-validation';
import { Checkbox } from '../checkbox';
import { ValidationTooltip } from '../validation-tooltip';

export function CombatCard() {
  const {
    pointsAwarded,
    pointsAwardedPercentage,
    pointsRemaining,
    combatAchievementTierPoints,
    ehbPoints,
    tzhaarCapePoints,
    bloodTorvaPoints,
    dizanasQuiverPoints,
    bonusMultiplier,
    bonusPointsAwarded,
  } = useCombatPointCalculator();
  const {
    formState: { defaultValues, errors },
    getValues,
  } = useFormContext<RankCalculatorSchema>();
  const [hasBloodTorva, hasDizanasQuiver] = getValues([
    'hasBloodTorva',
    'hasDizanasQuiver',
  ]);

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
              unoptimized
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
            readOnly
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
      <DataCard.Row
        left={
          <Text color="gray" size="2">
            TzHaar cape
          </Text>
        }
        center={
          <Select
            aria-label="TzHaar cape value"
            name="tzhaarCape"
            placeholder="Select a cape"
            options={TzHaarCape.options}
          />
        }
        right={
          <Text aria-label="TzHaar cape points" color="gray" size="2">
            {formatNumber(tzhaarCapePoints)}
          </Text>
        }
      />
      <DataCard.Row
        left={
          <ValidationTooltip
            error={errors.hasDizanasQuiver}
            color="gray"
            size="2"
          >
            <Text>Dizana&apos;s quiver</Text>
          </ValidationTooltip>
        }
        center={<Checkbox name="hasDizanasQuiver" checked={hasDizanasQuiver} />}
        right={
          <Text aria-label="Dizana's quiver points" color="gray" size="2">
            {formatNumber(dizanasQuiverPoints)}
          </Text>
        }
      />
      <DataCard.Row
        left={
          <ValidationTooltip error={errors.hasBloodTorva} color="gray" size="2">
            <Text>Blood torva</Text>
          </ValidationTooltip>
        }
        center={<Checkbox name="hasBloodTorva" checked={hasBloodTorva} />}
        right={
          <Text aria-label="Blood torva points" color="gray" size="2">
            {formatNumber(bloodTorvaPoints)}
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
          <Text aria-label="Combat diary tier" size="2">
            {tavernDiaryTierNameByMultiplier[bonusMultiplier] ?? 'None'}
          </Text>
        }
        right={
          <Text aria-label="Combat point bonus multiplier" size="2">
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
