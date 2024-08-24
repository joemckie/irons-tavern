import { NextRequest, NextResponse } from 'next/server';
import { templeBaseUrl } from '@/config/constants.json';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  const rsn = request.nextUrl.searchParams.get('player');
  const response = await fetch(
    `${templeBaseUrl}/php/add_datapoint.php?player=${rsn}`,
  );

  return NextResponse.json({ success: response.ok });
}
