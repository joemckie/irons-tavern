import { clientConstants } from '@/config/constants.client';
import { Rank } from '@/config/enums';

export function getRankImageUrl(rank: Rank, isAbsoluteUrl = false) {
  return `${isAbsoluteUrl ? clientConstants.publicUrl : ''}/icons/${rank.replaceAll(' ', '_').toLowerCase()}.png`;
}
