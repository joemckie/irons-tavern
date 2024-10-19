'use client';

import '@radix-ui/themes/styles.css';
import { PropsWithChildren } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { Flex, Grid, Theme, ThemePanel, Avatar } from '@radix-ui/themes';
import { AchievementDiaryMap, PlayerData } from '@/types/rank-calculator';
import { useSearchParams } from 'next/navigation';
import { constants } from '@/config/constants';
import { Sidebar } from './components/sidebar';
import { Navigation } from './components/navigation';
import { RightSidebar } from './components/right-sidebar';
import { usePageLayout } from './hooks/use-page-layout';
import { stripEntityName } from './utils/strip-entity-name';

interface FormData {
  achievementDiaries: AchievementDiaryMap;
  collectionLogCount: number;
  playerName: string;
  items: Record<string, boolean>;
}

export default function RankCalculatorLayout({ children }: PropsWithChildren) {
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
      };
    },
  });

  const { navHeight, navRef, mainHeightCss } = usePageLayout();

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log(data);
  };

  return (
    <Theme accentColor="iris" appearance="dark">
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
              {children}
            </Flex>
          </Grid>
        </form>
      </FormProvider>
      <ThemePanel defaultOpen={false} />
    </Theme>
  );
}
