import { constants } from '@/config/constants';
import { Rank } from '@/config/enums';

export function getRankImageUrl(rank: Rank, isAbsoluteUrl = false) {
  return `${isAbsoluteUrl ? constants.publicUrl : ''}/icons/${rank.replaceAll(' ', '_').toLowerCase()}.png`;
}
