'use client';

import '@radix-ui/themes/styles.css';
import { PropsWithChildren } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { Flex, Grid, Theme, ThemePanel } from '@radix-ui/themes';
import { AchievementDiaryMap } from '@/types/rank-calculator';
import { Sidebar } from './components/sidebar';
import { Navigation } from './components/navigation';
import { RightSidebar } from './components/right-sidebar';
import { ItemTabs } from './components/item-tabs';
import { usePageLayout } from './hooks/use-page-layout';

interface FormData {
  achievementDiaries: AchievementDiaryMap;
  collectionLogCount: number;
  playerName: string;
  items: Record<string, boolean>;
}

export default function RankCalculatorLayout({ children }: PropsWithChildren) {
  const methods = useForm<FormData>({
    defaultValues: {
      achievementDiaries: {},
      collectionLogCount: 0,
      items: {},
    },
  });

  const { navHeight, tabsHeight, navRef, tabsRef, mainHeightCss } =
    usePageLayout();

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
              'sidebar tabs right-sidebar'
              '. main .'
            "
            columns="
              [sidebar] minmax(200px, 1fr)
              [main] minmax(0, 2fr)
              [right-sidebar] minmax(200px, 1fr)
            "
            rows={`${navHeight}px ${tabsHeight}px 1fr`}
          >
            <Navigation ref={navRef} />
            <Sidebar />
            <RightSidebar />
            <ItemTabs ref={tabsRef} />
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
