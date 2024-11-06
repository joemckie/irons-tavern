import { fetchPlayerAccounts } from './data-sources/fetch-player-accounts';
import { PlayerList } from './player-list';

export default async function RankCalculatorPlayerList() {
  const accounts = await fetchPlayerAccounts();

  return <PlayerList accounts={accounts} />;
}
