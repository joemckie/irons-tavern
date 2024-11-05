import { Suspense } from 'react';
import { Grid, Text } from '@radix-ui/themes';
import { SubmitHandler, useFormContext } from 'react-hook-form';
import { FormData } from '@/types/rank-calculator';
import { toast } from 'react-toastify';
import { Navigation } from '../components/navigation';
import { Sidebar } from '../components/sidebar';
import { RightSidebar } from '../components/right-sidebar';
import { ItemList } from '../components/item-list';

interface RankCalculatorProps {
  onSubmitAction: SubmitHandler<FormData>;
}

export function RankCalculator({ onSubmitAction }: RankCalculatorProps) {
  const { handleSubmit } = useFormContext<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      await onSubmitAction(data);
      toast.success('Rank application submitted!');
    } catch {
      toast.error('Form submission failed!');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid
        areas={{
          initial: `
            'nav'
            'sidebar'
            'right-sidebar'
            'main'
          `,
          md: `
            'nav nav nav'
            'sidebar main right-sidebar'
          `,
        }}
        columns={{
          initial: 'repeat(auto-fit, minmax(400px, 1fr))',
          md: `
            [sidebar] minmax(200px, 1fr)
            [main] minmax(0, 2fr)
            [right-sidebar] minmax(200px, 1fr)
        `,
        }}
        rows="54px 1fr"
      >
        <Navigation />
        <Suspense fallback={<Text>Loading</Text>}>
          <Sidebar />
        </Suspense>
        <Suspense fallback={<Text>Loading</Text>}>
          <RightSidebar />
        </Suspense>
        <Suspense fallback={<Text>Loading</Text>}>
          <ItemList />
        </Suspense>
      </Grid>
    </form>
  );
}
