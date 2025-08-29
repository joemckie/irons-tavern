import { put } from '@vercel/blob';
import { NextRequest, NextResponse } from 'next/server';
import { clientConstants } from '@/config/constants.client';
import { GroupUpdateRequest } from '@/app/schemas/temple-api';
import { serverConstants } from '@/config/constants.server';
import { ClanExport } from '@/app/schemas/inactivity-checker';

export async function POST(request: NextRequest) {
  const updateTemple = request.nextUrl.searchParams.get('updateTemple') === 'true';
  const body = ClanExport.parse(await request.json());

  const { members, leaders } = body.clanMemberMaps.reduce(
    (acc, member) => {
      if (clientConstants.ranks.leaders.includes(member.rank)) {
        return { ...acc, leaders: acc.leaders.concat(member.rsn) };
      }

      return { ...acc, members: acc.members.concat(member.rsn) };
    },
    { leaders: [] as string[], members: [] as string[] },
  );

  const templeUpdateData = {
    'clan-checkbox': 'on',
    clan: '3',
    id: serverConstants.temple.groupId,
    key: serverConstants.temple.groupKey,
    name: serverConstants.temple.groupName,
    leaders: leaders.toString(),
    members: members.toString(),
    ...(serverConstants.temple.privateGroup === 'true'
      ? { 'private-group-checkbox': 'on' }
      : {}),
  } satisfies GroupUpdateRequest;

  console.log('Updating member list');

  // Sync our Temple page with the new member list
  await fetch(`${clientConstants.temple.baseUrl}/groups/edit.php`, {
    method: 'POST',
    body: new URLSearchParams(templeUpdateData),
  });

  await Promise.all([
    // Save the member list to the Vercel blob store to use later
    put('members.json', JSON.stringify(body.clanMemberMaps), {
      access: 'public',
    }),
    ...(updateTemple
      ? [
          // Check all players in the new member list
          fetch(`${clientConstants.publicUrl}/api/check-all-players`),
        ]
      : []),
  ]);

  return NextResponse.json({ success: true });
}
