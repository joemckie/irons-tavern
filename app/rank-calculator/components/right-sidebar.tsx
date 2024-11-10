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
      pb={{ initial: '0', md: '3' }}
      gridArea="right-sidebar"
      gridRow={{
        md: 'span 2',
      }}
      height={{ md: mainHeightCss }}
    >
      <ScrollArea>
        <Flex asChild gap="4" direction="column">
          <aside>
            <PlayerCard />
            <SkillingCard />
          </aside>
        </Flex>
      </ScrollArea>
    </Box>
  );
}
