import { Flex, Progress, Separator, Text } from '@radix-ui/themes';
import { DiaryLocation, DiaryTier } from '@/types/osrs';
import Image from 'next/image';
import { DataCard } from '../data-card';
import { Select } from '../select';
import { EditableText } from '../editable-text';

export function SkillingCard() {
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
            <Text weight="bold" size="2">
              Skilling
            </Text>
          </Flex>
        }
        right={
          <Text weight="bold" size="2">
            65458
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
        center={<EditableText name="ehp" required type="number" />}
        right={
          <Text color="gray" size="2">
            11440
          </Text>
        }
      />
      <DataCard.Row
        left={
          <Text color="gray" size="2">
            Total level
          </Text>
        }
        center={<EditableText name="totalLevel" required type="number" />}
        right={
          <Text color="gray" size="2">
            42018
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
              name={`achievementDiaries.${location}`}
              placeholder="Choose a tier"
              size="1"
              options={Object.values(DiaryTier)}
            />
          }
          right={
            <Text color="gray" size="2">
              1000
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
