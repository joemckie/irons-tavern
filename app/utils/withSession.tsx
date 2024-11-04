import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import React from 'react';

export function withSession<T extends object>(
  Component: React.FunctionComponent<T>,
) {
  return async function verifySession(props: T) {
    const session = await auth();

    if (!session?.user) {
      redirect('/login');
    }

    return <Component {...props} />;
  };
}
