import { BaseSyntheticEvent, ReactNode } from 'react';
import { Grid } from '@radix-ui/themes';
import { Sidebar } from '../components/sidebar';
import { RightSidebar } from '../components/right-sidebar';
import { ItemList } from '../components/item-list';

interface RankCalculatorProps {
  submitRankCalculatorAction: (e: BaseSyntheticEvent) => void;
  navigation: ReactNode;
}

export function RankCalculator({
  submitRankCalculatorAction,
  navigation,
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
        gapX="3"
      >
        {navigation}
        <Sidebar />
        <RightSidebar />
        <ItemList />
      </Grid>
    </form>
  );
}
