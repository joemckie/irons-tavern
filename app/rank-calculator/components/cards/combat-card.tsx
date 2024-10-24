import { Flex, Progress, Separator, Text } from '@radix-ui/themes';
import { CombatAchievementTier } from '@/types/osrs';
import Image from 'next/image';
import { DataCard } from '../data-card';
import { Select } from '../select';
import { EditableText } from '../editable-text';
import { useCombatPointCalculator } from '../../hooks/point-calculator/use-combat-point-calculator';

export function CombatCard() {
  const {
    availablePoints,
    pointsAwarded,
    pointsAwardedPercentage,
    caTierPoints,
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
            <Text weight="bold" size="2">
              Combat
            </Text>
          </Flex>
        }
        right={
          <Text aria-label="Total combat points" weight="bold" size="2">
            {pointsAwarded}
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
        center={<EditableText name="ehb" type="number" />}
        right={
          <Text aria-label="EHB points" color="gray" size="2">
            {ehbPoints}
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
            name="caTier"
            placeholder="Choose a tier"
            size="1"
            options={['None', ...Object.values(CombatAchievementTier)]}
          />
        }
        right={
          <Text aria-label="CA tier points" color="gray" size="2">
            {caTierPoints}
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
            {pointsAwardedPercentage.toFixed(2)}%
          </Text>
        }
        right={
          <Text aria-label="Combat points remaining" color="gray" size="2">
            ({availablePoints - pointsAwarded})
          </Text>
        }
      />
      <Progress size="3" value={pointsAwardedPercentage} />
    </DataCard.Root>
  );
}
