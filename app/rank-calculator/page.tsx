'use client';

import '@radix-ui/themes/styles.css';
import { useEffect, useRef, useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { Flex, Grid } from '@radix-ui/themes';
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
  const [navHeight, setNavHeight] = useState<number>(54);
  const pageHeightCss = navHeight ? `calc(100vh - ${navHeight}px)` : '100vh';

  useEffect(() => {
    if (navRef.current) {
      setNavHeight(navRef.current.offsetHeight);
    }
  }, [navRef]);

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
          'sidebar main'
        "
            columns="[sidebar] minmax(200px, 1fr) [main] minmax(0, 3fr)"
            rows={`[nav] ${navHeight}px [main] ${pageHeightCss}`}
            gapX="3"
          >
            <Navigation ref={navRef} />
            <Sidebar />
            <Flex gridArea="main" direction="column" height={pageHeightCss}>
              <ItemList />
            </Flex>
          </Grid>
        </form>
      </PlayerDataProvider>
    </FormProvider>
  );
}
