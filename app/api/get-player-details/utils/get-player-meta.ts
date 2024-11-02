import { list } from '@vercel/blob';
import { parse } from 'date-fns';
import { ClanMember } from '../../update-member-list/route';
import { captureException } from '@sentry/nextjs';

export async function getPlayerMeta(player: string) {
  const blobList = await list({
    prefix: 'members',
  });
  const [{ url }] = blobList.blobs.sort(
    (a, b) => +b.uploadedAt - +a.uploadedAt,
  );

  try {
    const response = await fetch(url);
    const data: ClanMember[] = await response.json();

    const playerMeta = data?.find(
      ({ rsn }) => rsn.toLowerCase() === player.toLowerCase(),
    );

    const joinDate = playerMeta?.joinedDate
      ? parse(playerMeta.joinedDate, 'dd-MMM-yyyy', new Date())
      : null;

    return {
      joinDate,
      rsn: playerMeta?.rsn ?? player,
    };
  } catch (error) {
    captureException(error);

    return null;
  }
}
