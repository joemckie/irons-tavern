import {
  BaseSyntheticEvent,
  ReactNode,
  startTransition,
  Suspense,
} from 'react';
import { Grid, Text } from '@radix-ui/themes';
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
    <form
      onSubmit={(e) => {
        startTransition(() => {
          submitRankCalculatorAction(e);
        });
      }}
    >
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
        <Suspense fallback={<Text>Loading</Text>}>
          <ItemList />
        </Suspense>
      </Grid>
    </form>
  );
}
