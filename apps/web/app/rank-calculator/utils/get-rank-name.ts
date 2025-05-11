import { Rank } from '@/config/enums';
import { rankNames } from '@/config/ranks';

export function getRankName(rank: Rank) {
  return rankNames[rank] ?? rank;
}
