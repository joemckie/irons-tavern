'use client';

import '@radix-ui/themes/styles.css';
import { PropsWithChildren, useEffect, useRef, useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { Flex, Grid, Theme, ThemePanel } from '@radix-ui/themes';
import { AchievementDiaryMap } from '@/types/rank-calculator';
import { Sidebar } from './components/sidebar';
import { Navigation } from './components/navigation';
import { RightSidebar } from './components/right-sidebar';
import { ItemTabs } from './components/item-tabs';

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

  const navRef = useRef<HTMLElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const [navHeight, setNavHeight] = useState<number>(54);
  const [tabsHeight, setTabsHeight] = useState<number>(38);
  const pageHeightCss =
    navHeight && tabsHeight
      ? `calc(100vh - ${navHeight}px - ${tabsHeight}px)`
      : '100vh';

  useEffect(() => {
    if (navRef.current) {
      setNavHeight(navRef.current.offsetHeight);
    }
  }, [navRef]);

  useEffect(() => {
    if (tabsRef.current) {
      setTabsHeight(tabsRef.current.offsetHeight);
    }
  }, [tabsRef]);

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
            <ItemTabs />
            <Flex gridArea="main" height={pageHeightCss}>
              {children}
            </Flex>
          </Grid>
        </form>
      </FormProvider>
      <ThemePanel defaultOpen={false} />
    </Theme>
  );
}
