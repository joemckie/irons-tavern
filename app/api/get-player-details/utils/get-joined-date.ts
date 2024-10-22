import { list } from '@vercel/blob';
import { parse } from 'date-fns';
import { ClanMember } from '../../update-member-list/route';

export async function getJoinedDate(player: string) {
  const blobList = await list();
  const [{ url }] = blobList.blobs.sort(
    (a, b) => +b.uploadedAt - +a.uploadedAt,
  );

  try {
    const response = await fetch(url);
    const data: ClanMember[] = await response.json();

    const joinDate = data?.find(
      ({ rsn }) => rsn.toLowerCase() === player.toLowerCase(),
    )?.joinedDate;

    return joinDate ? parse(joinDate, 'dd-MM-yyyy', new Date()) : null;
  } catch (e) {
    console.error(e);

    return null;
  }
}
