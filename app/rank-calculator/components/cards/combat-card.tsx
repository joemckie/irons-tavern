import { Flex, Progress, Separator, Text } from '@radix-ui/themes';
import { CombatAchievementTier } from '@/types/osrs';
import Image from 'next/image';
import { DataCard } from '../data-card';
import { Select } from '../select';
import { EditableText } from '../editable-text';
import { useCombatPointCalculator } from '../../hooks/point-calculator/combat/use-combat-point-calculator';
import { formatPercentage } from '../../utils/format-percentage';
import { getPointsRemainingLabel } from '../../utils/get-points-remaining-label';
import { formatNumber } from '../../utils/format-number';

export function CombatCard() {
  const {
    pointsAwarded,
    pointsAwardedPercentage,
    pointsRemaining,
    combatAchievementTierPoints,
    ehbPoints,
  } = useCombatPointCalculator();

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
            <Text role="heading" weight="bold" size="2">
              Combat
            </Text>
          </Flex>
        }
        right={
          <Text aria-label="Total combat points" weight="bold" size="2">
            {formatNumber(pointsAwarded)}
          </Text>
        }
      />
      <Separator size="4" />
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
            options={Object.values(CombatAchievementTier)}
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
