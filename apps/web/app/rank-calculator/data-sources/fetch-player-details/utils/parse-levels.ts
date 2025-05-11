import { WikiSyncResponse } from '@/app/schemas/wiki';

export function parseLevels({
  Overall,
  ...levels
}: WikiSyncResponse['levels']) {
  return levels;
}
