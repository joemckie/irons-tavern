import { itemsResponseFixture } from '@/fixtures/items-response.fixture';
import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json(itemsResponseFixture);
}
