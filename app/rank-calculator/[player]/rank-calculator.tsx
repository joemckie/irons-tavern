'use client';

import { FormData } from '@/types/rank-calculator';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { Grid } from '@radix-ui/themes';
import { usePageLayout } from '../hooks/use-page-layout';
import { Navigation } from '../components/navigation';
import { Sidebar } from '../components/sidebar';
import { RightSidebar } from '../components/right-sidebar';
import { ItemList } from '../components/item-list';

interface RankCalculatorProps {
  formData: FormData;
}

export function RankCalculator({ formData }: RankCalculatorProps) {
  const { navHeight, navRef } = usePageLayout();

  const methods = useForm<FormData>({
    defaultValues: formData,
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
