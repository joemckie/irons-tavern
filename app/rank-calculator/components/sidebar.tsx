import { Box, Flex, ScrollArea, Separator } from '@radix-ui/themes';
import { RankProgressCard } from './cards/rank-progress-card';
import { CombatCard } from './cards/combat-card';
import { CollectionLogCard } from './cards/collection-log-card';
import { NotableItemsCard } from './cards/notable-items-card';
import { usePageLayout } from '../hooks/use-page-layout';

export function Sidebar() {
  const { mainHeightCss } = usePageLayout();

  return (
    <Box
      asChild
      p="3"
      gridArea="sidebar"
      style={{
        borderRight: '1px solid var(--gray-5)',
      }}
    >
      <ScrollArea style={{ height: mainHeightCss }}>
        <aside>
          <Flex gap="4" direction="column">
            <RankProgressCard />
            <Separator size="4" />
            <CombatCard />
            <CollectionLogCard />
            <NotableItemsCard />
          </Flex>
        </aside>
      </ScrollArea>
    </Box>
  );
}
