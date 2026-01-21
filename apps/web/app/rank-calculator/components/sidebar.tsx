import { Box, Flex, ScrollArea } from '@radix-ui/themes';
import { RankProgressCard } from './cards/rank-progress-card';
import { CombatCard } from './cards/combat-card';
import { CollectionLogCard } from './cards/collection-log-card';
import { NotableItemsCard } from './cards/notable-items-card';
import { usePageHeight } from '../hooks/use-page-height';
import { ModerationCard } from './cards/moderation-card';
import { useParams } from 'next/navigation';

export function Sidebar() {
  const mainHeightCss = usePageHeight();
  const { submissionId } = useParams<{ submissionId?: string }>();

  return (
    <Box asChild gridArea="sidebar" height={{ md: mainHeightCss }}>
      <ScrollArea>
        <Flex
          gap="4"
          direction="column"
          asChild
          p="3"
          pr={{ md: '0' }}
          pb={{ initial: '0', md: '3' }}
        >
          <aside>
            {submissionId && <ModerationCard />}
            <RankProgressCard />
            <CombatCard />
            <CollectionLogCard />
            <NotableItemsCard />
          </aside>
        </Flex>
      </ScrollArea>
    </Box>
  );
}
