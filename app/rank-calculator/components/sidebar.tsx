import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { Box, Button, Flex, TextField } from '@radix-ui/themes';
import { useFormContext } from 'react-hook-form';
import { ItemStatistics } from './item-statistics';

interface SidebarProps {
  handlePlayerSearch: () => void;
}

export function Sidebar({ handlePlayerSearch }: SidebarProps) {
  const { register } = useFormContext();

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
