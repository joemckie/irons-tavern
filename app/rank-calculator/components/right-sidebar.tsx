import { Box, Flex, ScrollArea } from '@radix-ui/themes';
import { SkillingCard } from './cards/skilling-card';
import { usePageLayout } from '../hooks/use-page-layout';

export function RightSidebar() {
  const { sidebarHeightCss } = usePageLayout();

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
      <ScrollArea style={{ height: sidebarHeightCss }}>
        <aside>
          <Flex gap="4" direction="column">
            <SkillingCard />
          </Flex>
        </aside>
      </ScrollArea>
    </Box>
  );
}
