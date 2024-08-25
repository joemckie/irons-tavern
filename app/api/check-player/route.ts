import { NextRequest, NextResponse } from 'next/server';
import { constants } from '@/config/constants';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  const rsn = request.nextUrl.searchParams.get('player');

  try {
    const response = await fetch(
      `${constants.temple.baseUrl}/php/add_datapoint.php?player=${rsn}`,
    );

    console.log(await response.json());

    return NextResponse.json({ success: true });
  } catch (e) {
    console.error(e);

    return NextResponse.json({ success: false });
  }
}
