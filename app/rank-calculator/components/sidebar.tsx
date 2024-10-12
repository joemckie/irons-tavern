import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import {
  Box,
  Button,
  DataList,
  Flex,
  Section,
  TextField,
} from '@radix-ui/themes';
import { useFormContext } from 'react-hook-form';

interface SidebarProps {
  handlePlayerSearch: () => void;
}

export function Sidebar({ handlePlayerSearch }: SidebarProps) {
  const { register } = useFormContext();

  return (
    <Box asChild p="3" gridArea="sidebar">
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
          <DataList.Root>
            <DataList.Item>
              <DataList.Label>Total item points</DataList.Label>
              <DataList.Value>{5000}</DataList.Value>
            </DataList.Item>
            <DataList.Item>
              <DataList.Label>Items collected</DataList.Label>
              <DataList.Value>{100}</DataList.Value>
            </DataList.Item>
            <DataList.Item>
              <DataList.Label>Total items available</DataList.Label>
              <DataList.Value>{200}</DataList.Value>
            </DataList.Item>
            <DataList.Item>
              <DataList.Label>Items collected (%)</DataList.Label>
              <DataList.Value>{20}</DataList.Value>
            </DataList.Item>
            <DataList.Item>
              <DataList.Label>Points achieved (%)</DataList.Label>
              <DataList.Value>{10}</DataList.Value>
            </DataList.Item>
          </DataList.Root>
        </Flex>
      </aside>
    </Box>
  );
}
