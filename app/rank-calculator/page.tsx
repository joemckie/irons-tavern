'use client';

import { useState } from 'react';
import { ItemsResponse, PlayerDataResponse } from '@/types/rank-calculator';
import { constants } from '@/config/constants';
import { useQuery } from '@tanstack/react-query';
import { ItemList } from './components/item-list';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';

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

    playerDetails?.items.forEach((item) => {
      typeof methods.getValues(`items.${item}`) !== 'undefined' &&
        methods.setValue(`items.${item}`, true);
    });
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <div>
          <input
            className="text-slate-400 bg-slate-600"
            type="search"
            {...methods.register('playerName')}
          />
          <button onClick={() => handlePlayerSearch()} type="button">
            Search
          </button>
        </div>
        {isLoading ? (
          <div>Loading item list...</div>
        ) : (
          <ItemList items={items} />
        )}
        <button type="submit">Submit</button>
      </form>
    </FormProvider>
  );
}
