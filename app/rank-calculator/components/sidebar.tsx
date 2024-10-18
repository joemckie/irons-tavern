import { Box, Flex, ScrollArea, Separator } from '@radix-ui/themes';
import { InputMask } from '@react-input/mask';
import { useFormContext } from 'react-hook-form';
import { RankProgressCard } from './cards/rank-progress-card';
import { CombatCard } from './cards/combat-card';
import { CollectionLogCard } from './cards/collection-log-card';
import { ItemStatistics } from './item-statistics';
import { usePageLayout } from '../hooks/use-page-layout';
import { Input } from './input';

export function Sidebar() {
  const { sidebarHeightCss } = usePageLayout();
  const { register } = useFormContext();

  return (
    <Box
      asChild
      p="3"
      gridArea="sidebar"
      gridRow="span 2"
      style={{
        borderRight: '1px solid var(--gray-5)',
      }}
    >
      <ScrollArea style={{ height: sidebarHeightCss }}>
        <aside>
          <Flex gap="4" direction="column">
            <Flex gap="2" justify="between">
              <Flex asChild flexGrow="1">
                <InputMask
                  component={Input}
                  mask="__-__-____"
                  replacement={{ _: /[0-9]/ }}
                  placeholder="Join date"
                  {...register('joinDate', {
                    required: true,
                    valueAsDate: true,
                  })}
                />
              </Flex>
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
