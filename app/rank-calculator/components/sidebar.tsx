import {
  Box,
  Button,
  DataList,
  Dialog,
  Flex,
  Progress,
  Separator,
  Text,
} from '@radix-ui/themes';
import { useFormContext } from 'react-hook-form';
import { constants } from '@/config/constants';
import { PlayerData } from '@/types/rank-calculator';
import { merge } from 'lodash';
import { CombatAchievementTier, DiaryLocation, DiaryTier } from '@/types/osrs';
import { InputMask } from '@react-input/mask';
import { stripEntityName } from '../utils/strip-entity-name';
import { Select } from './select';
import { Input } from './input';
import { RankProgressCard } from './rank-progress-card';
import { DataCard } from './data-card';

export function Sidebar() {
  const { register, getValues, setValue } = useFormContext();

  const handlePlayerSearch = async () => {
    const player = getValues('playerName');

    if (!player) {
      return;
    }

    const response = await fetch(
      `${constants.publicUrl}/api/get-player-details?player=${player}`,
    );
    const data = (await response.json()) as PlayerData;

    const acquiredItems =
      data.acquiredItems?.reduce<Record<string, boolean>>(
        (acc, val) => ({ ...acc, [stripEntityName(val)]: true }),
        {},
      ) ?? {};

    setValue('items', merge(getValues('items'), acquiredItems));
    setValue(
      'achievementDiaries',
      merge(getValues('achievementDiaries'), data.achievementDiaries),
    );
    setValue('joinDate', data.joinDate);
    setValue('collectionLogCount', data.collectionLogCount);
  };

  return (
    <Box
      asChild
      p="3"
      gridArea="sidebar"
      gridRow="span 2"
      style={{
        borderRight: '1px solid var(--gray-5)',
      }}
    >
      <aside>
        <Flex gap="4" direction="column">
          <RankProgressCard />
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
              center={<Text size="2">524</Text>}
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
                  options={Object.values(CombatAchievementTier).map((tier) => ({
                    label: tier,
                    value: tier,
                  }))}
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
            <Progress size="2" value={40} />
          </DataCard.Root>
          <DataCard.Root>
            <DataCard.Row
              left={
                <Text color="gray" size="2">
                  Category
                </Text>
              }
              center={
                <Text align="center" weight="bold" size="2">
                  Clogging
                </Text>
              }
              right={
                <Text align="right" color="gray" size="2">
                  Points
                </Text>
              }
            />
            <DataCard.Row
              left={
                <Text color="gray" size="2">
                  Slots
                </Text>
              }
              center={
                <Input
                  type="number"
                  size="1"
                  {...register('collectionLogCount', {
                    required: true,
                  })}
                />
              }
              right={
                <Text color="gray" size="2">
                  11440
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
            <Progress size="2" value={40} />
          </DataCard.Root>
          <Flex gap="2" justify="between">
            <Flex asChild flexGrow="1">
              <>
                <Input
                  placeholder="Player name"
                  {...register('playerName', {
                    onBlur: handlePlayerSearch,
                    required: true,
                  })}
                />
                <InputMask
                  component={Input}
                  mask="__-__-____"
                  replacement={{ _: /[0-9]/ }}
                  placeholder="Join date"
                  {...register('joinDate', {
                    required: true,
                    valueAsDate: true,
                  })}
                />
              </>
            </Flex>
          </Flex>
          <Separator size="4" />
          <Dialog.Root>
            <Dialog.Trigger>
              <Button>Achievement diaries</Button>
            </Dialog.Trigger>

            <Dialog.Content maxWidth="450px">
              <Dialog.Title>Achievement Diaries</Dialog.Title>
              <Dialog.Description size="2" mb="4">
                Mark your achievement diary progress
              </Dialog.Description>

              <DataList.Root>
                {Object.keys(DiaryLocation).map((diaryLocation) => (
                  <DataList.Item key={diaryLocation} align="center">
                    <DataList.Label>{diaryLocation}</DataList.Label>
                    <DataList.Value>
                      <Select
                        name={`achievementDiaries.${diaryLocation}`}
                        size="2"
                        placeholder="Choose a tier"
                        options={Object.keys(DiaryTier).map((tier) => ({
                          label: tier,
                          value: tier,
                        }))}
                      />
                    </DataList.Value>
                  </DataList.Item>
                ))}
              </DataList.Root>

              <Flex gap="3" mt="4" justify="end">
                <Dialog.Close>
                  <Button variant="soft" color="gray">
                    Close
                  </Button>
                </Dialog.Close>
              </Flex>
            </Dialog.Content>
          </Dialog.Root>
        </Flex>
      </aside>
    </Box>
  );
}
