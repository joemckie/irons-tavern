import { list } from '@vercel/blob';
import { parse } from 'date-fns';
import * as Sentry from '@sentry/nextjs';
import { ClanMember } from '@/app/api/update-member-list/route';

export async function fetchPlayerMeta(player: string) {
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
    Sentry.captureException(error);

    return null;
  }
}