import { auth } from '@/auth';
import { userOSRSAccountsKey } from '@/config/redis';
import { redis } from '@/redis';
import { Player } from '@/app/schemas/player';

export async function fetchPlayerAccounts() {
  const session = await auth();

  if (!session?.user?.id) {
    return {};
  }

  const accounts = await redis.hgetall<Record<string, Player>>(
    userOSRSAccountsKey(session.user.id),
  );

  return accounts ?? {};
}
