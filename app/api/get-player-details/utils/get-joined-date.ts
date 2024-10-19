import { list } from '@vercel/blob';
import { ClanMember } from '../../update-member-list/route';

export async function getJoinedDate(player: string) {
  const blobList = await list();
  const [{ url }] = blobList.blobs.sort(
    (a, b) => +b.uploadedAt - +a.uploadedAt,
  );

  const response = await fetch(url);
  const data: ClanMember[] = await response.json();

  return (
    data.find(({ rsn }) => rsn.toLowerCase() === player.toLowerCase())
      ?.joinedDate ?? null
  );
}
