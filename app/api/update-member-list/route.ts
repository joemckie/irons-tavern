import { put } from '@vercel/blob';
import { NextRequest, NextResponse } from 'next/server';

export interface ClanMember {
  rsn: string;
  rank: string;
  joinedDate: string;
}

interface ClanExport {
  clanName: string;
  clanMemberMaps: ClanMember[];
}

export async function POST(request: NextRequest) {
  const body: ClanExport = await request.json();

  const { url } = await put(
    'members.json',
    JSON.stringify(body.clanMemberMaps),
    {
      access: 'public',
    },
  );

  return NextResponse.json({ url });
}
