import { BaseSyntheticEvent, Suspense } from 'react';
import { Grid, Text } from '@radix-ui/themes';
import { Navigation } from '../components/navigation';
import { Sidebar } from '../components/sidebar';
import { RightSidebar } from '../components/right-sidebar';
import { ItemList } from '../components/item-list';

interface RankCalculatorProps {
  submitRankCalculatorAction: (e: BaseSyntheticEvent) => void;
}

export function RankCalculator({
  submitRankCalculatorAction,
}: RankCalculatorProps) {
  return (
    <form onSubmit={submitRankCalculatorAction}>
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
          md: `
            [sidebar] minmax(200px, 1fr)
            [main] minmax(0, 2fr)
            [right-sidebar] minmax(200px, 1fr)
        `,
        }}
        rows="62px 1fr"
      >
        <Navigation />
        <Sidebar />
        <RightSidebar />
        <Suspense fallback={<Text>Loading</Text>}>
          <ItemList />
        </Suspense>
      </Grid>
    </form>
  );
}
