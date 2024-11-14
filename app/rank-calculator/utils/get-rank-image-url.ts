import { Rank } from '@/config/enums';

export function getRankImageUrl(rank: Rank, isAbsoluteUrl = false) {
  return `${isAbsoluteUrl ? process.env.NEXT_PUBLIC_URL : ''}/icons/${rank.replaceAll(' ', '_').toLowerCase()}.png`;
}
