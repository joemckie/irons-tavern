'use client';

import '@radix-ui/themes/styles.css';
import { Suspense, useEffect, useRef, useState } from 'react';
import { PlayerDataResponse } from '@/types/rank-calculator';
import { constants } from '@/config/constants';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { Flex, Grid, Spinner, Text } from '@radix-ui/themes';
import { Sidebar } from './components/sidebar';
import { Navigation } from './components/navigation';
import { ItemList } from './components/item-list';

export interface FormData {
  playerName: string;
  items: Record<string, boolean>;
}

export default function RankCalculator() {
  const [playerDetails, setPlayerDetails] = useState<PlayerDataResponse>();
  const methods = useForm<FormData>({
    defaultValues: {
      items: {},
    },
  });

  const navRef = useRef<HTMLElement>(null);
  const [navHeight, setNavHeight] = useState<number>();

  useEffect(() => {
    if (navRef.current) {
      setNavHeight(navRef.current.offsetHeight);
    }
  }, [navRef]);

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log(data);
  };

  const handlePlayerSearch = async () => {
    const player = methods.getValues('playerName');
    const response = await fetch(
      `${constants.publicUrl}/api/get-player-details?player=${player}`,
    );
    const data = (await response.json()) as PlayerDataResponse;

    setPlayerDetails(data);

    data?.items.forEach((item) => {
      methods.setValue(`items.${item}`, true);
    });
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Grid
          areas="
          'nav nav'
          'sidebar main'
        "
          columns="[sidebar] minmax(200px, 1fr) [main] minmax(0, 3fr)"
          rows={`[nav] ${navHeight}px [main] calc(100vh - ${navHeight}px)`}
          gapX="3"
        >
          <Navigation ref={navRef} />
          <Sidebar handlePlayerSearch={handlePlayerSearch} />
          <Flex
            gridArea="main"
            asChild
            direction="column"
            height={`calc(100vh - ${navHeight}px)`}
          >
            <Suspense
              fallback={
                <Flex
                  align="center"
                  justify="center"
                  direction="column"
                  gap="3"
                >
                  <Spinner size="3" />
                  <Text color="gray">Loading item list</Text>
                </Flex>
              }
            >
              <ItemList />
            </Suspense>
          </Flex>
        </Grid>
      </form>
    </FormProvider>
  );
}
