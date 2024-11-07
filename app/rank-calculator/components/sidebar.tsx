import { Box, Flex, ScrollArea } from '@radix-ui/themes';
import { RankProgressCard } from './cards/rank-progress-card';
import { CombatCard } from './cards/combat-card';
import { CollectionLogCard } from './cards/collection-log-card';
import { NotableItemsCard } from './cards/notable-items-card';
import { usePageHeight } from '../hooks/use-page-height';

export function Sidebar() {
  const mainHeightCss = usePageHeight();

  return (
    <Box
      asChild
      p="3"
      gridArea="sidebar"
      style={{
        borderRight: '1px solid var(--gray-5)',
      }}
      height={{ md: mainHeightCss }}
    >
      <ScrollArea>
        <aside>
          <Flex gap="4" direction="column">
            <RankProgressCard />
            <CombatCard />
            <CollectionLogCard />
            <NotableItemsCard />
          </Flex>
        </aside>
      </ScrollArea>
    </Box>
  );
}
