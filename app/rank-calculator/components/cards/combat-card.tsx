import { Progress, Separator, Text } from '@radix-ui/themes';
import { CombatAchievementTier } from '@/types/osrs';
import { DataCard } from '../data-card';
import { Select } from '../select';
import { EditableText } from '../editable-text';

export function CombatCard() {
  return (
    <DataCard.Root>
      <DataCard.Row
        left={
          <Text weight="bold" size="2">
            Combat
          </Text>
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
            5240
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
            20000
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
