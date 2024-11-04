import 'next-auth/jwt';
import NextAuth, { NextAuthConfig } from 'next-auth';
import Discord, { DiscordProfile } from 'next-auth/providers/discord';
import * as Sentry from '@sentry/nextjs';
import { APIGuild, Routes } from 'discord-api-types/v10';
import { discord } from './discord';

declare module 'next-auth' {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface Profile extends DiscordProfile {}

  interface User {
    permissions: string;
  }
}

declare module 'next-auth/jwt' {
  /** Returned by the `jwt` callback and `auth`, when using JWT sessions */
  // eslint-disable-next-line no-shadow
  interface JWT {
    id: string;
    permissions: string;
  }
}

export const config = {
  debug: /\*|nextauth/.test(process.env.DEBUG ?? ''),
  callbacks: {
    /* eslint-disable no-param-reassign */
    async jwt({ profile, token }) {
      if (profile?.id) {
        token.id = profile.id;

        const response = (await discord.get(Routes.userGuilds())) as APIGuild[];
        const { permissions } =
          response.find(({ id }) => id === process.env.DISCORD_GUILD_ID) ?? {};

        if (!permissions) {
          throw new Error('No permissions found for user');
        }

        token.permissions = permissions;
      }

      return token;
    },
    session({ session, token }) {
      const scope = Sentry.getCurrentScope();

      session.user.id = token.id;
      session.user.permissions = token.permissions;

      scope.setUser({
        id: token.id,
      });

      return session;
    },
  },
  /* eslint-enable no-param-reassign */
  logger: {
    error: Sentry.captureException,
  },
  providers: [
    Discord<DiscordProfile>({
      authorization:
        'https://discord.com/api/oauth2/authorize?scope=identify+guilds.members.read',
    }),
  ],
} satisfies NextAuthConfig;

export const { handlers, signIn, signOut, auth } = NextAuth(config);
