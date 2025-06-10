import { BaseSyntheticEvent, ReactNode } from 'react';
import { Grid } from '@radix-ui/themes';
import dedent from 'dedent';
import { Sidebar } from '../components/sidebar';
import { RightSidebar } from '../components/right-sidebar';
import { ItemList } from '../components/item-list';

interface RankCalculatorProps {
  submitRankCalculatorAction: ((e: BaseSyntheticEvent) => void) | undefined;
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
          initial: dedent`
            'nav'
            'sidebar'
            'right-sidebar'
            'main'
          `,
          md: dedent`
            'nav nav nav'
            'sidebar main right-sidebar'
          `,
        }}
        columns={{
          md: dedent`
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
