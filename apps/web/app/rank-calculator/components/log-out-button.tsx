'use client';

import { Button } from '@radix-ui/themes';
import { signOut } from 'next-auth/react';

export function LogOutButton() {
  return (
    <Button variant="soft" onClick={() => signOut()}>
      Log out
    </Button>
  );
}
