import { Box, Flex, ScrollArea, Separator } from '@radix-ui/themes';
import { RankProgressCard } from './cards/rank-progress-card';
import { CombatCard } from './cards/combat-card';
import { CollectionLogCard } from './cards/collection-log-card';
import { ItemStatistics } from './item-statistics';
import { usePageLayout } from '../hooks/use-page-layout';
import { DatePicker } from './date-picker';

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
            <Flex gap="2" justify="between" asChild>
              <DatePicker name="joinDate" popperPlacement="bottom" />
            </Flex>
            <RankProgressCard />
            <Separator size="4" />
            <CombatCard />
            <CollectionLogCard />
            <ItemStatistics />
          </Flex>
        </aside>
      </ScrollArea>
    </Box>
  );
}
