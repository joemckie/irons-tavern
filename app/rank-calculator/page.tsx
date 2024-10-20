'use client';

import { Grid } from '@radix-ui/themes';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { useSearchParams } from 'next/navigation';
import { FormData } from '@/types/rank-calculator';
import { Navigation } from './components/navigation';
import { Sidebar } from './components/sidebar';
import { RightSidebar } from './components/right-sidebar';
import { usePageLayout } from './hooks/use-page-layout';
import { ItemList } from './components/item-list';
import { usePlayerDetails } from './hooks/use-player-details';

export default function RankCalculator() {
  const params = useSearchParams();
  const player = params.get('player');

  if (!player) {
    throw new Error('Please provide a player name');
  }

  const { data: playerDetails } = usePlayerDetails(player);
  const { navHeight, navRef } = usePageLayout();

  const methods = useForm<FormData>({
    defaultValues: playerDetails,
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
          <ItemList />
        </Grid>
      </form>
    </FormProvider>
  );
}
