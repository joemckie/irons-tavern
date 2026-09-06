import { auth } from '@/auth';
import * as Sentry from '@sentry/nextjs';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { fetchPlayerDetails } from '../data-sources/fetch-player-details/fetch-player-details';
import { FormWrapper } from './form-wrapper';
import { saveDraftRankSubmissionAction } from './actions/save-draft-rank-submission-action';
import {
  fetchItemDropRates,
  generateRequiredItemList,
} from '../data-sources/fetch-dropped-item-info';
import { buildNotableItemList } from '../utils/build-notable-item-list';
import { connection } from 'next/server';

export const instant = false;

export default async function RankCalculatorPage({
  params,
}: PageProps<'/rank-calculator/[player]'>) {
  const { player } = await params;
  const decodedPlayer = decodeURIComponent(player);

  Sentry.setTag('rsn', decodedPlayer);

  await connection();

  const session = await auth();

  if (!session?.user?.id) {
    throw new Error('No user session');
  }

  const { id: userId } = session.user;

  const [playerDetails, dropRates] = await Promise.all([
    fetchPlayerDetails(decodedPlayer, userId),
    fetchItemDropRates([...generateRequiredItemList()]),
  ]);

  const notableItemList = await buildNotableItemList(dropRates);

  if (!playerDetails.success) {
    return <p>An error occurred</p>;
  }

  const {
    currentRank,
    hasTemplePlayerStats,
    hasWikiSyncData,
    hasThirdPartyData,
    hasTempleCollectionLog,
    isTempleCollectionLogOutdated,
    isMobileOnly,
    ...formData
  } = playerDetails.data;

  if (hasThirdPartyData) {
    await saveDraftRankSubmissionAction(formData);
  }

  const queryClient = new QueryClient();

  queryClient.setQueryData(['drop-rates'], dropRates);
  queryClient.setQueryData(['items'], Object.entries(notableItemList));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <FormWrapper
        formData={formData}
        currentRank={currentRank}
        warnings={{
          templeCollectionLogNotFound: !isMobileOnly && !hasTempleCollectionLog,
          templeCollectionLogOutdated:
            !isMobileOnly && isTempleCollectionLogOutdated,
          wikiSyncNotFound: !isMobileOnly && !hasWikiSyncData,
        }}
      />
    </HydrationBoundary>
  );
}
