import { Box, Flex } from '@radix-ui/themes';
import { SkillingCard } from './cards/skilling-card';

export function RightSidebar() {
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
      <aside>
        <Flex gap="4" direction="column">
          <SkillingCard />
        </Flex>
      </aside>
    </Box>
  );
}
