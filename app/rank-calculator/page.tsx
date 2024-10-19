'use client';

import { lazy, Suspense } from 'react';
import AutoSizer from 'react-virtualized-auto-sizer';
import { Box, Flex, Grid, ScrollArea, Spinner, Text } from '@radix-ui/themes';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { constants } from '@/config/constants';
import { AchievementDiaryMap, PlayerData } from '@/types/rank-calculator';
import { useSearchParams } from 'next/navigation';
import { CombatAchievementTier } from '@/types/osrs';
import { useGetItems } from './hooks/use-get-items';
import { Navigation } from './components/navigation';
import { Sidebar } from './components/sidebar';
import { RightSidebar } from './components/right-sidebar';
import { usePageLayout } from './hooks/use-page-layout';
import { stripEntityName } from './utils/strip-entity-name';

const Category = lazy(() => import('./components/category'));

interface FormData {
  achievementDiaries: AchievementDiaryMap;
  collectionLogCount: number;
  playerName: string;
  items: Record<string, boolean>;
  caTier: CombatAchievementTier | null;
}

export default function RankCalculator() {
  const { data: categories } = useGetItems();
  const { navHeight, navRef, mainHeightCss } = usePageLayout();
  const params = useSearchParams();
  const player = params.get('player');

  if (!player) {
    throw new Error('Please provide a player name');
  }

  const methods = useForm<FormData>({
    async defaultValues() {
      const response = await fetch(
        `${constants.publicUrl}/api/get-player-details?player=${player}`,
      );
      const data = (await response.json()) as PlayerData;

      const acquiredItems =
        data.acquiredItems?.reduce<Record<string, boolean>>(
          (acc, val) => ({ ...acc, [stripEntityName(val)]: true }),
          {},
        ) ?? {};

      return {
        items: acquiredItems,
        achievementDiaries: data.achievementDiaries ?? {
          'Kourend & Kebos': null,
          'Lumbridge & Draynor': null,
          'Western Provinces': null,
          Ardougne: null,
          Desert: null,
          Falador: null,
          Fremennik: null,
          Kandarin: null,
          Karamja: null,
          Morytania: null,
          Varrock: null,
          Wilderness: null,
        },
        joinDate: data.joinDate,
        collectionLogCount: data.collectionLogCount ?? 0,
        playerName: player,
        caTier: data.combatAchievementTier,
      };
    },
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log(data);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Grid
          areas="
        'nav nav nav'
        'sidebar main right-sidebar'
        "
          columns="
        [sidebar] minmax(200px, 1fr)
        [main] minmax(0, 2fr)
        [right-sidebar] minmax(200px, 1fr)
        "
          rows={`${navHeight}px 1fr`}
        >
          <Navigation ref={navRef} />
          <Sidebar />
          <RightSidebar />
          <Flex gridArea="main" height={mainHeightCss}>
            <Suspense
              fallback={
                <Flex
                  direction="column"
                  align="center"
                  justify="center"
                  flexGrow="1"
                  gap="3"
                >
                  <Spinner size="3" />
                  <Text>Loading...</Text>
                </Flex>
              }
            >
              <AutoSizer>
                {({ height, width }) => (
                  <ScrollArea style={{ height, width }}>
                    {categories.map(([title, category]) => (
                      <Box key={title} pl="3" pr="4">
                        <Category items={category.items} title={title} />
                      </Box>
                    ))}
                  </ScrollArea>
                )}
              </AutoSizer>
            </Suspense>
          </Flex>
        </Grid>
      </form>
    </FormProvider>
  );
}
