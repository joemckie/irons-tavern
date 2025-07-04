import * as Sentry from '@sentry/nextjs';
import { list } from '@vercel/blob';
import { ClanMemberList } from '@/app/schemas/inactivity-checker';
import { redis } from '@/redis';
import { Player } from '@/app/schemas/player';
import { userOSRSAccountsKey } from '@/config/redis';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { EditPlayerForm } from './edit-player-form';

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
}: {
  params: Promise<{ player: string }>;
}) {
  const session = await auth();

  if (!session?.user?.id) {
    redirect('/rank-calculator');
  }

  const { player } = await params;
  const playerRecord = await redis.hget<Player>(
    userOSRSAccountsKey(session.user.id),
    decodeURIComponent(player).toLowerCase(),
  );

  if (!playerRecord) {
    redirect('/rank-calculator');
  }

  const memberList = await getLatestMemberList();

  return <EditPlayerForm members={memberList} playerRecord={playerRecord} />;
}
