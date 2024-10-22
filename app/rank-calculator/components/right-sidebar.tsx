import { Box, Flex, ScrollArea, Separator } from '@radix-ui/themes';
import { SkillingCard } from './cards/skilling-card';
import { usePageLayout } from '../hooks/use-page-layout';
import { PlayerCard } from './cards/player-card';

export function RightSidebar() {
  const { mainHeightCss } = usePageLayout();

  return (
    <Box
      asChild
      p="3"
      gridArea="right-sidebar"
      gridRow="span 2"
      style={{
        borderLeft: '1px solid var(--gray-5)',
      }}
    >
      <ScrollArea style={{ height: mainHeightCss }}>
        <aside>
          <Flex gap="4" direction="column">
            <PlayerCard />
            <Separator size="4" />
            <SkillingCard />
          </Flex>
        </aside>
      </ScrollArea>
    </Box>
  );
}
