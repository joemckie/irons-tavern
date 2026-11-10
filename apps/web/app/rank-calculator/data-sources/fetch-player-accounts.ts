import { auth } from '@/auth';
import { connection } from 'next/server';
import { initORM, withRequestContext } from '@/database/db';
import { OSRSAccount } from '@/database/entities/osrs-account';

export async function fetchPlayerAccounts() {
  await connection();

  return withRequestContext(async () => {
    const session = await auth();

    if (!session?.user?.id) {
      return [];
    }

    const { em } = await initORM();

    return em.find(OSRSAccount, {
      user: { discordId: session.user.id },
    });
  });
}
