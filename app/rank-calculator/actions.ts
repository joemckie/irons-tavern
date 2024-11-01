'use server';

import { add } from 'date-fns';
import { cookies } from 'next/headers';

export async function getAccessToken() {
  return (await cookies()).get('accessToken');
}

export async function setAccessToken(token: string, expires: number) {
  (await cookies()).set('accessToken', token, {
    httpOnly: true,
    sameSite: 'strict',
    path: '/rank-calculator',
    expires: Date.now() + expires,
  });
}

export async function getRefreshToken() {
  return (await cookies()).get('refreshToken');
}

export async function setRefreshToken(token: string) {
  (await cookies()).set('refreshToken', token, {
    httpOnly: true,
    sameSite: 'strict',
    path: '/rank-calculator',
    expires: add(new Date(), {
      years: 1,
    }),
  });
}
