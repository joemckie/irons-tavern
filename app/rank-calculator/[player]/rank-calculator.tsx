import { Grid } from '@radix-ui/themes';
import { SubmitHandler, useFormContext } from 'react-hook-form';
import { FormData } from '@/types/rank-calculator';
import { Navigation } from '../components/navigation';
import { Sidebar } from '../components/sidebar';
import { RightSidebar } from '../components/right-sidebar';
import { ItemList } from '../components/item-list';

interface RankCalculatorProps {
  onSubmit: SubmitHandler<FormData>;
}

export function RankCalculator({ onSubmit }: RankCalculatorProps) {
  const { handleSubmit } = useFormContext<FormData>();

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
        <Sidebar />
        <RightSidebar />
        <ItemList />
      </Grid>
    </form>
  );
}
