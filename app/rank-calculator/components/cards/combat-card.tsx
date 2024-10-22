import { Flex, Progress, Separator, Text } from '@radix-ui/themes';
import { CombatAchievementTier } from '@/types/osrs';
import Image from 'next/image';
import { DataCard } from '../data-card';
import { Select } from '../select';
import { EditableText } from '../editable-text';
import { usePointCalculator } from '../../hooks/use-point-calculator';

export function CombatCard() {
  const { ehbPoints, caTierPoints } = usePointCalculator();

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
          <Text weight="bold" size="2">
            25240
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
          <Text color="gray" size="2">
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
            options={Object.values(CombatAchievementTier)}
          />
        }
        right={
          <Text color="gray" size="2">
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
        center={<Text size="2">40%</Text>}
        right={
          <Text color="gray" size="2">
            (30000)
          </Text>
        }
      />
      <Progress size="3" value={40} />
    </DataCard.Root>
  );
}
