import { auth } from '@/auth';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  const session = await auth();

  if (request.nextUrl.pathname === '/login') {
    if (session?.user?.id) {
      return NextResponse.redirect(new URL('/rank-calculator', request.url));
    }
  }

  if (request.nextUrl.pathname.startsWith('/rank-calculator')) {
    if (!session?.user?.id) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}
