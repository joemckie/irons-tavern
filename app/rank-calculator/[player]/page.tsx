import { RankCalculator } from './rank-calculator';
import { getPlayerDetails } from '../hooks/use-player-details';

interface Params {
  player: string;
}

export default async function RankCalculatorPage({
  params,
}: {
  params: Params;
}) {
  const playerDetails = await getPlayerDetails(params.player);

  return <RankCalculator formData={playerDetails} />;
}
