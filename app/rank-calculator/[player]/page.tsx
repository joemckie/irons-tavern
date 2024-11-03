import { FormWrapper } from './form-wrapper';
import { getPlayerDetails } from '../utils/get-player-details';

interface Params {
  player: string;
}

export default async function RankCalculatorPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { player } = await params;
  const playerDetails = await getPlayerDetails(decodeURIComponent(player));

  return <FormWrapper formData={playerDetails} />;
}
