'use client';

import '@radix-ui/themes/styles.css';
import { useEffect, useRef, useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { Flex, Grid, TabNav } from '@radix-ui/themes';
import { AchievementDiaryMap } from '@/types/rank-calculator';
import { Sidebar } from './components/sidebar';
import { Navigation } from './components/navigation';
import { ItemList } from './components/item-list';
import { PlayerDataProvider } from './contexts/player-data-context';

interface FormData {
  achievementDiaries: AchievementDiaryMap;
  playerName: string;
  items: Record<string, boolean>;
}

export default function RankCalculator() {
  const methods = useForm<FormData>({
    defaultValues: {
      achievementDiaries: {},
      items: {},
    },
  });

  const navRef = useRef<HTMLElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const [navHeight, setNavHeight] = useState<number>(54);
  const [tabsHeight, setTabsHeight] = useState<number>(38);
  const pageHeightCss = navHeight
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
    <FormProvider {...methods}>
      <PlayerDataProvider>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <Grid
            areas="
              'nav nav'
              'sidebar tabs'
              '. main'
            "
            columns="[sidebar] minmax(200px, 1fr) [main] minmax(0, 3fr)"
          >
            <Navigation ref={navRef} />
            <Sidebar />
            <Flex
              justify="center"
              gridArea="tabs"
              direction="column"
              ref={tabsRef}
            >
              <TabNav.Root>
                <TabNav.Link href="#" active>
                  Notable items
                </TabNav.Link>
                <TabNav.Link href="#">Achievement Diaries</TabNav.Link>
              </TabNav.Root>
            </Flex>
            <Flex gridArea="main" px="3" height={pageHeightCss}>
              <ItemList />
            </Flex>
          </Grid>
        </form>
      </PlayerDataProvider>
    </FormProvider>
  );
}
