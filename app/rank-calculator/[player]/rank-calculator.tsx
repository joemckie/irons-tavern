import { Grid } from '@radix-ui/themes';
import { SubmitHandler, useFormContext } from 'react-hook-form';
import { FormData } from '@/types/rank-calculator';
import { usePageLayout } from '../hooks/use-page-layout';
import { Navigation } from '../components/navigation';
import { Sidebar } from '../components/sidebar';
import { RightSidebar } from '../components/right-sidebar';
import { ItemList } from '../components/item-list';
import { useSubmitForm } from '../hooks/use-submit-form';
import { useRankCalculator } from '../hooks/point-calculator/use-rank-calculator';
import { getRankName } from '../utils/get-rank-name';

export function RankCalculator() {
  const { handleSubmit } = useFormContext<FormData>();
  const { navHeight, navRef } = usePageLayout();
  const { mutateAsync: saveSubmission } = useSubmitForm();
  const { rank, pointsAwarded } = useRankCalculator();
  const rankName = getRankName(rank);

  const onSubmit: SubmitHandler<FormData> = async (formData) => {
    try {
      const response = await saveSubmission({
        formData,
        points: pointsAwarded,
        rank: rankName,
      });

      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

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
      >
        <Navigation ref={navRef} />
        <Sidebar />
        <RightSidebar />
        <ItemList />
      </Grid>
    </form>
  );
}
