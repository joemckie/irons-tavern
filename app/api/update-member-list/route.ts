import { put } from '@vercel/blob';
import { NextRequest, NextResponse } from 'next/server';
import { constants } from '@/config/constants';
import { Rank } from '@/config/enums';
import { revalidatePath } from 'next/cache';

export interface ClanMember {
  rsn: string;
  rank: Rank;
  joinedDate: string;
}

interface ClanExport {
  clanName: string;
  clanMemberMaps: ClanMember[];
}

interface TempleGroupUpdateRequest {
  clan: '100';
  'clan-checkbox': 'on';
  'private-group-checkbox'?: 'on';
  name: string;
  members: string;
  leaders: string;
  id: string;
  key: string;
}

export async function POST(request: NextRequest) {
  if (
    !constants.temple.groupId ||
    !constants.temple.groupKey ||
    !constants.temple.groupName
  ) {
    throw new Error('Temple group key or ID not provided');
  }

  const body: ClanExport = await request.json();
  const { members, leaders } = body.clanMemberMaps.reduce(
    (acc, member) => {
      if (constants.ranks.leaders.includes(member.rank)) {
        return {
          ...acc,
          leaders: acc.leaders.concat(member.rsn),
        };
      }

      return {
        ...acc,
        members: acc.members.concat(member.rsn),
      };
    },
    {
      leaders: [] as string[],
      members: [] as string[],
    },
  );

  const templeUpdateData = {
    'clan-checkbox': 'on',
    clan: '100',
    id: constants.temple.groupId,
    key: constants.temple.groupKey,
    name: constants.temple.groupName,
    leaders: leaders.toString(),
    members: members.toString(),
    ...(constants.temple.privateGroup && { 'private-group-checkbox': 'on' }),
  } satisfies TempleGroupUpdateRequest;

  // Sync our Temple page with the new member list
  await fetch(`${constants.temple.baseUrl}/groups/edit.php`, {
    method: 'POST',
    body: new URLSearchParams(templeUpdateData),
  });

  // Check all players in the new member list
  fetch(`${constants.publicUrl}/api/check-all-players`, {
    method: 'POST',
  });

  // Save the member list to the Vercel blob store to use later
  await put('members.json', JSON.stringify(body.clanMemberMaps), {
    access: 'public',
  });

  return NextResponse.json({ success: true });
}
