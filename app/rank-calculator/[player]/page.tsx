import * as Sentry from '@sentry/nextjs';
import { fetchPlayerDetails } from '../data-sources/fetch-player-details/fetch-player-details';
import { FormWrapper } from './form-wrapper';

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

  const { currentRank, hasSavedData, ...formData } = playerDetails.data;

  return (
    <FormWrapper
      formData={formData}
      hasSavedData={hasSavedData}
      currentRank={currentRank}
    />
  );
}
