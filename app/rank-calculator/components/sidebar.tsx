import { useContext } from 'react';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { Box, Button, Flex, TextField } from '@radix-ui/themes';
import { useFormContext } from 'react-hook-form';
import { constants } from '@/config/constants';
import { PlayerData } from '@/types/rank-calculator';
import { merge } from 'lodash';
import { ItemStatistics } from './item-statistics';
import { PlayerDataContext } from '../contexts/player-data-context';
import { stripEntityName } from '../utils/strip-entity-name';

export function Sidebar() {
  const { register, getValues, setValue } = useFormContext();
  const { setPlayerData } = useContext(PlayerDataContext);

  const handlePlayerSearch = async () => {
    const player = getValues('playerName');
    const response = await fetch(
      `${constants.publicUrl}/api/get-player-details?player=${player}`,
    );
    const data = (await response.json()) as PlayerData;

    setPlayerData(data);

    const acquiredItems = data.acquiredItems.reduce(
      (acc, val) => ({ ...acc, [stripEntityName(val)]: true }),
      {},
    );

    setValue('items', merge(getValues('items'), acquiredItems));
  };

  return (
    <Box
      asChild
      p="3"
      gridArea="sidebar"
      style={{
        borderRight: '1px solid var(--gray-5)',
      }}
    >
      <aside>
        <Flex gap="4" direction="column">
          <Flex gap="2" justify="between">
            <Flex asChild flexGrow="1">
              <TextField.Root
                placeholder="Player name"
                type="search"
                {...register('playerName')}
              >
                <TextField.Slot>
                  <MagnifyingGlassIcon />
                </TextField.Slot>
              </TextField.Root>
            </Flex>
            <Button onClick={handlePlayerSearch} type="button" variant="soft">
              Search
            </Button>
          </Flex>
          <ItemStatistics />
        </Flex>
      </aside>
    </Box>
  );
}
