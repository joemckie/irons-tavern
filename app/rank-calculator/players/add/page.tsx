import * as Sentry from '@sentry/nextjs';
import { list } from '@vercel/blob';
import { ClanMember } from '@/app/api/update-member-list/route';
import { withSession } from '@/app/utils/withSession';
import { AddPlayerForm } from './add-player-form';
import { submitAddPlayerForm } from './actions/submit-add-player-form';

async function getLatestMemberList() {
  const blobList = await list();
  const [{ url }] = blobList.blobs.sort(
    (a, b) => +b.uploadedAt - +a.uploadedAt,
  );

  try {
    const response = await fetch(url);
    const data: ClanMember[] = await response.json();

    return data.map(({ rsn }) => rsn);
  } catch (error) {
    Sentry.captureException(error);

    return [];
  }
}

async function RankCalculatorAddPlayerPage() {
  const memberList = await getLatestMemberList();

  return (
    <AddPlayerForm
      submitFormAction={submitAddPlayerForm}
      members={memberList}
    />
  );
}

export default withSession(RankCalculatorAddPlayerPage);
