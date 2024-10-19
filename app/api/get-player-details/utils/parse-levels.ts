import { WikiSyncResponse } from '@/types/wiki';

export function parseLevels({
  Overall,
  ...levels
}: WikiSyncResponse['levels']) {
  return levels;
}
