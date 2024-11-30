import * as Sentry from '@sentry/nextjs';
import { fetchPlayerDetails } from '../data-sources/fetch-player-details/fetch-player-details';
import { FormWrapper } from './form-wrapper';
import { saveDraftRankSubmissionAction } from './actions/save-draft-rank-submission-action';

interface Params {
  player: string;
}

export default async function RankCalculatorPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { player } = await params;
  const decodedPlayer = decodeURIComponent(player);

  Sentry.setTag('rsn', decodedPlayer);

  const playerDetails = await fetchPlayerDetails(decodedPlayer);

  if (!playerDetails.success) {
    return <p>An error occurred</p>;
  }

  const {
    currentRank,
    hasCollectionLogData,
    hasTempleData,
    hasWikiSyncData,
    hasThirdPartyData,
    ...formData
  } = playerDetails.data;

  if (hasThirdPartyData) {
    await saveDraftRankSubmissionAction(formData);
  }

  return <FormWrapper formData={formData} currentRank={currentRank} />;
}
