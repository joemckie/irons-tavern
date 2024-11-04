import { Grid } from '@radix-ui/themes';
import { SubmitHandler, useFormContext } from 'react-hook-form';
import { FormData } from '@/types/rank-calculator';
import { useMediaQuery } from 'usehooks-ts';
import { usePageLayout } from '../hooks/use-page-layout';
import { Navigation } from '../components/navigation';
import { Sidebar } from '../components/sidebar';
import { RightSidebar } from '../components/right-sidebar';
import { ItemList } from '../components/item-list';

interface RankCalculatorProps {
  onSubmit: SubmitHandler<FormData>;
}

export function RankCalculator({ onSubmit }: RankCalculatorProps) {
  const { handleSubmit } = useFormContext<FormData>();
  const { navHeight, navRef } = usePageLayout();
  const isMediumViewport = useMediaQuery('(min-width: 768px)');

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
        style={{
          ...(!isMediumViewport ? { display: 'block' } : {}),
        }}
      >
        <Navigation ref={navRef} />
        <Sidebar />
        <RightSidebar />
        <ItemList />
      </Grid>
    </form>
  );
}
