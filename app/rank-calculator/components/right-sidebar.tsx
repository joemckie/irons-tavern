import { Box, Flex, ScrollArea } from '@radix-ui/themes';
import { SkillingCard } from './cards/skilling-card';
import { usePageHeight } from '../hooks/use-page-height';
import { PlayerCard } from './cards/player-card';

export function RightSidebar() {
  const mainHeightCss = usePageHeight();

  return (
    <Box
      asChild
      p="3"
      pl={{ md: '0' }}
      gridArea="right-sidebar"
      gridRow={{
        md: 'span 2',
      }}
      height={{ md: mainHeightCss }}
    >
      <ScrollArea>
        <aside>
          <Flex gap="4" direction="column">
            <PlayerCard />
            <SkillingCard />
          </Flex>
        </aside>
      </ScrollArea>
    </Box>
  );
}
