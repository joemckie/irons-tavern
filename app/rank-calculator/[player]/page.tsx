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
  const playerDetails = await fetchPlayerDetails(decodeURIComponent(player));

  if (!playerDetails.success) {
    return <p>An error occurred</p>;
  }

  return <FormWrapper formData={playerDetails.data} />;
}
