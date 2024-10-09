'use client';

import '@radix-ui/themes/styles.css';
import { useState } from 'react';
import { ItemsResponse, PlayerDataResponse } from '@/types/rank-calculator';
import { constants } from '@/config/constants';
import { useQuery } from '@tanstack/react-query';
import { ItemList } from './components/item-list';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import {
  Box,
  Button,
  Card,
  Container,
  Flex,
  Grid,
  Section,
  Skeleton,
  TextField,
} from '@radix-ui/themes';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';

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
  const { data: items, isLoading } = useGetItems();
  const methods = useForm<FormData>({
    defaultValues: {
      playerName: 'cousinofkos',
      items: Object.entries(items ?? {}).reduce(
        (acc, [, items]) => {
          items.forEach((item) => {
            acc[item.name] = false;
          });

          return acc;
        },
        {} as Record<string, boolean>,
      ),
    },
  });

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
    <Container>
      <Grid
        areas="'header header header' 'main main sidebar' 'main main sidebar'"
        columns="1fr 1fr 1fr"
        gap="4"
      >
        <Box gridArea="header" asChild>
          <header>Header</header>
        </Box>
        <FormProvider {...methods}>
          <Box gridArea="main" asChild>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
              <Section size="1">
                <Flex gap="2">
                  <TextField.Root
                    placeholder="Player name"
                    type="search"
                    {...methods.register('playerName')}
                  >
                    <TextField.Slot>
                      <MagnifyingGlassIcon />
                    </TextField.Slot>
                  </TextField.Root>
                  <Button
                    onClick={handlePlayerSearch}
                    type="button"
                    variant="soft"
                  >
                    Search
                  </Button>
                </Flex>
              </Section>
              {isLoading ? <Skeleton /> : <ItemList items={items} />}
              <Button type="submit">Submit</Button>
            </form>
          </Box>
          <Box gridArea="sidebar" asChild>
            <Card>Sidebar</Card>
          </Box>
        </FormProvider>
      </Grid>
    </Container>
  );
}
