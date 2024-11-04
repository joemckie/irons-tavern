import { Box, Flex, ScrollArea, Separator } from '@radix-ui/themes';
import { SkillingCard } from './cards/skilling-card';
import { usePageHeight } from '../hooks/use-page-height';
import { PlayerCard } from './cards/player-card';

export function RightSidebar() {
  const mainHeightCss = usePageHeight();

  return (
    <Box
      asChild
      p="3"
      gridArea="right-sidebar"
      gridRow={{
        md: 'span 2',
      }}
      style={{
        borderLeft: '1px solid var(--gray-5)',
      }}
    >
      <Box asChild height={{ md: mainHeightCss }}>
        <ScrollArea>
          <aside>
            <Flex gap="4" direction="column">
              <PlayerCard />
              <Separator size="4" />
              <SkillingCard />
            </Flex>
          </aside>
        </ScrollArea>
      </Box>
    </Box>
  );
}
