import * as Sentry from '@sentry/nextjs';
import { list } from '@vercel/blob';
import { ClanMemberList } from '@/app/schemas/inactivity-checker';
import { initORM, withRequestContext } from '@/database/db';
import { OSRSAccount } from '@/database/entities/osrs-account';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { EditPlayerForm } from './edit-player-form';
import { connection } from 'next/server';

// TODO: Cache Components adoption. Refactor this route so this opt-out can be removed.
// See: https://nextjs.org/docs/app/guides/migrating-to-cache-components
export const instant = false;

async function getLatestMemberList() {
  const blobList = await list();
  const [{ url }] = blobList.blobs.sort(
    (a, b) => +b.uploadedAt - +a.uploadedAt,
  );

  try {
    const response = await fetch(url);
    const data = ClanMemberList.parse(await response.json());

    return data.map(({ rsn }) => rsn);
  } catch (error) {
    Sentry.captureException(error);

    return [];
  }
}

export default async function RankCalculatorEditPlayerPage({
  params,
}: PageProps<'/rank-calculator/players/edit/[player]'>) {
  await connection();

  const session = await auth();

  if (!session?.user?.id) {
    redirect('/rank-calculator');
  }

  const { player } = await params;
  const userId = session.user.id;
  const account = await withRequestContext(async () => {
    const { em } = await initORM();

    return em.findOne(OSRSAccount, {
      user: userId,
      name: decodeURIComponent(player),
    });
  });

  if (!account) {
    redirect('/rank-calculator');
  }

  const memberList = await getLatestMemberList();

  return (
    <EditPlayerForm members={memberList} playerRecord={account.toPlayer()} />
  );
}
