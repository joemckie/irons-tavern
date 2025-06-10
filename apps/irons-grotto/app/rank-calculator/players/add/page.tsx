import * as Sentry from '@sentry/nextjs';
import { list } from '@vercel/blob';
import { ClanMemberList } from '@/app/schemas/inactivity-checker';
import { AddPlayerForm } from './add-player-form';

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

export default async function RankCalculatorAddPlayerPage() {
  const memberList = await getLatestMemberList();

  return <AddPlayerForm members={memberList} />;
}
