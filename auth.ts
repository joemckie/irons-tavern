import 'next-auth/jwt';
import { Redis } from '@upstash/redis';
import NextAuth, { NextAuthConfig } from 'next-auth';
import Discord, { DiscordProfile } from 'next-auth/providers/discord';
import * as Sentry from '@sentry/nextjs';

declare module 'next-auth' {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface Profile extends DiscordProfile {}
}

declare module 'next-auth/jwt' {
  /** Returned by the `jwt` callback and `auth`, when using JWT sessions */
  // eslint-disable-next-line no-shadow
  interface JWT {
    id: string;
  }
}

export const redis = Redis.fromEnv({
  keepAlive: false,
  retry: {
    retries: parseInt(process.env.REDIS_RETRIES ?? '0', 10),
  },
});

export const config = {
  debug: /\*|nextauth/.test(process.env.DEBUG ?? ''),
  callbacks: {
    async jwt({ profile, token }) {
      if (profile?.id) {
        // eslint-disable-next-line no-param-reassign
        token.id = profile.id;
      }

      return token;
    },
    session({ session, token }) {
      const scope = Sentry.getCurrentScope();

      // eslint-disable-next-line no-param-reassign
      session.user.id = token.id;

      scope.setUser({
        id: token.id,
      });

      return session;
    },
  },
  logger: {
    error: Sentry.captureException,
  },
  providers: [
    Discord<DiscordProfile>({
      authorization: 'https://discord.com/api/oauth2/authorize?scope=identify',
    }),
  ],
} satisfies NextAuthConfig;

export const { handlers, signIn, signOut, auth } = NextAuth(config);
