import { auth } from '@/auth';
import { Flex, Heading } from '@radix-ui/themes';
import { PermissionFlagsBits } from 'discord-api-types/v10';
import React from 'react';

export type PermissionsString = keyof typeof PermissionFlagsBits;

export function withAuth<T extends object>(
  Component: React.FunctionComponent<T>,
  allowedPermissions: NonEmptyArray<PermissionsString>,
) {
  return async function handleAuth(props: T) {
    const session = await auth();
    const userPermissions = session?.user?.permissions;

    if (
      !userPermissions ||
      !allowedPermissions.some(
        (permission) =>
          // eslint-disable-next-line no-bitwise
          (PermissionFlagsBits[permission] & BigInt(userPermissions)) ===
          PermissionFlagsBits[permission],
      )
    ) {
      return (
        <Flex align="center" justify="center" height="100vh">
          <Heading>Unauthorised</Heading>
        </Flex>
      );
    }

    return <Component {...props} />;
  };
}
