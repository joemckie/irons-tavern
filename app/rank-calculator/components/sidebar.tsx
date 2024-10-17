import {
  Box,
  Button,
  Card,
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
import { ItemStatistics } from './item-statistics';
import { stripEntityName } from '../utils/strip-entity-name';
import { Select } from './select';
import { Input } from './input';
import { EditableText } from './editable-text';
import { RankProgressCard } from './rank-progress-card';

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
          <Card>
            <Flex direction="column" gap="3">
              <Flex justify="between" align="end">
                <Flex flexBasis="33%" asChild>
                  <Text color="gray">Category</Text>
                </Flex>
                <Flex flexBasis="33%" justify="center" asChild>
                  <Text align="center" weight="bold">
                    Combat
                  </Text>
                </Flex>
                <Flex flexBasis="33%" justify="end" asChild>
                  <Text align="right" color="gray">
                    Points
                  </Text>
                </Flex>
              </Flex>
              <Flex justify="between">
                <Flex flexBasis="33%" asChild>
                  <Text color="gray">EHB</Text>
                </Flex>
                <Flex flexBasis="33%" justify="center" asChild>
                  <Text>524</Text>
                </Flex>
                <Flex flexBasis="33%" justify="end" asChild>
                  <Text color="gray">5240</Text>
                </Flex>
              </Flex>
              <Flex justify="between" align="center">
                <Flex flexBasis="33%" asChild>
                  <Text color="gray">CA Tier</Text>
                </Flex>
                <Flex flexBasis="33%" justify="center" asChild>
                  <Select
                    name="caTier"
                    placeholder="Choose a tier"
                    options={Object.values(CombatAchievementTier).map(
                      (tier) => ({
                        label: tier,
                        value: tier,
                      }),
                    )}
                  />
                </Flex>
                <Flex flexBasis="33%" justify="end" asChild>
                  <Text color="gray">20000</Text>
                </Flex>
              </Flex>
              <Progress size="2" value={40} />
              <Flex justify="between">
                <Flex flexBasis="33%" asChild>
                  <Text color="gray" size="2">
                    Progress
                  </Text>
                </Flex>
                <Flex flexBasis="33%" justify="center" asChild>
                  <Text size="2">40%</Text>
                </Flex>
                <Flex flexBasis="33%" justify="end" asChild>
                  <Text color="gray" size="2">
                    (30000)
                  </Text>
                </Flex>
              </Flex>
            </Flex>
          </Card>
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
          <DataList.Root>
            <DataList.Item align="center">
              <DataList.Label>Collection log</DataList.Label>
              <DataList.Value>
                <EditableText name="collectionLogCount" type="number" />
              </DataList.Value>
            </DataList.Item>
          </DataList.Root>
          <Separator size="4" />
          <ItemStatistics />
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
