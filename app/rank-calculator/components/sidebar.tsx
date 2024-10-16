import { useContext } from 'react';
import { Box, DataList, Flex, Separator } from '@radix-ui/themes';
import { useFormContext } from 'react-hook-form';
import { constants } from '@/config/constants';
import { PlayerData } from '@/types/rank-calculator';
import { merge } from 'lodash';
import { DiaryLocation, DiaryTier } from '@/types/osrs';
import { InputMask } from '@react-input/mask';
import { ItemStatistics } from './item-statistics';
import { PlayerDataContext } from '../contexts/player-data-context';
import { stripEntityName } from '../utils/strip-entity-name';
import { Select } from './select';
import { Input } from './input';

export function Sidebar() {
  const { register, getValues, setValue } = useFormContext();
  const { setPlayerData } = useContext(PlayerDataContext);

  const handlePlayerSearch = async () => {
    const player = getValues('playerName');

    if (!player) {
      return;
    }

    const response = await fetch(
      `${constants.publicUrl}/api/get-player-details?player=${player}`,
    );
    const data = (await response.json()) as PlayerData;

    setPlayerData(data);

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
          <ItemStatistics />
          <Separator size="4" />
          <DataList.Root>
            {Object.keys(DiaryLocation).map((diaryLocation) => (
              <DataList.Item key={diaryLocation}>
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
        </Flex>
      </aside>
    </Box>
  );
}
