'use client';

import '@radix-ui/themes/styles.css';
import { useRef, useState } from 'react';
import { ItemsResponse, PlayerDataResponse } from '@/types/rank-calculator';
import { constants } from '@/config/constants';
import { useQuery } from '@tanstack/react-query';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { Flex, Grid, Spinner } from '@radix-ui/themes';
import { Sidebar } from './components/sidebar';
import { Navigation } from './components/navigation';
import { ItemList } from './components/item-list';

function useGetItems() {
  return useQuery({
    queryKey: ['items'],
    async queryFn() {
      const response = await fetch(`${constants.publicUrl}/api/get-items`);

      return response.json() as Promise<ItemsResponse>;
    },
  });
}

interface FormData {
  playerName: string;
  items: Record<string, boolean>;
}

export default function RankCalculator() {
  const [playerDetails, setPlayerDetails] = useState<PlayerDataResponse>();
  const { data: rawItemCategories, isLoading } = useGetItems();
  const itemCategories = Object.entries(rawItemCategories ?? {});
  const methods = useForm<FormData>({
    defaultValues: {
      playerName: '',
      items: itemCategories.reduce(
        (acc, [, { items }]) => {
          items.forEach((item) => {
            acc[item.name.replaceAll("'", '')] = false;
          });

          return acc;
        },
        {} as Record<string, boolean>,
      ),
    },
  });

  const navRef = useRef<HTMLElement>(null);
  const navHeight = `${navRef.current?.offsetHeight}`;

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log(data);
  };

  async function handlePlayerSearch() {
    const player = methods.getValues('playerName');
    const response = await fetch(
      `${constants.publicUrl}/api/get-player-details?player=${player}`,
    );
    const data = (await response.json()) as PlayerDataResponse;

    setPlayerDetails(data);

    data?.items.forEach((item) => {
      methods.setValue(`items.${item}`, true);
    });
  }

  return (
    <FormProvider {...methods}>
      <Grid
        areas="
          'nav nav'
          'sidebar main'
        "
        columns="[sidebar] minmax(0, 1fr) [main] minmax(0, 4fr)"
        rows={`[nav] ${navHeight}px [main] calc(100vh - ${navHeight}px)`}
        gapX="3"
      >
        <Navigation ref={navRef} />
        <Sidebar handlePlayerSearch={handlePlayerSearch} />
        <Flex
          gridArea="main"
          asChild
          direction="column"
          flexBasis="1"
          style={{ background: 'red' }}
          height={`calc(100vh - ${navHeight}px)`}
        >
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            {isLoading ? (
              <Spinner size="3" />
            ) : (
              <ItemList categories={itemCategories} />
            )}
          </form>
        </Flex>
      </Grid>
    </FormProvider>
  );
}
