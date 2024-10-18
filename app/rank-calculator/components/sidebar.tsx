import {
  Box,
  Button,
  DataList,
  Dialog,
  Flex,
  Separator,
} from '@radix-ui/themes';
import { useFormContext } from 'react-hook-form';
import { constants } from '@/config/constants';
import { PlayerData } from '@/types/rank-calculator';
import { merge } from 'lodash';
import { DiaryLocation, DiaryTier } from '@/types/osrs';
import { InputMask } from '@react-input/mask';
import { stripEntityName } from '../utils/strip-entity-name';
import { Select } from './select';
import { Input } from './input';
import { RankProgressCard } from './cards/rank-progress-card';
import { CombatCard } from './cards/combat-card';
import { CollectionLogCard } from './cards/collection-log-card';

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
          <Separator size="4" />
          <CombatCard />
          <CollectionLogCard />
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
