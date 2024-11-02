import { Redis } from '@upstash/redis';
import NextAuth, { NextAuthConfig } from 'next-auth';
import Discord, { DiscordProfile } from 'next-auth/providers/discord';
import { UpstashRedisAdapter } from '@auth/upstash-redis-adapter';
import { RedisKeyNamespace } from './config/redis';

declare module 'next-auth' {
  /**
   * The shape of the user object returned in the OAuth providers' `profile` callback,
   * or the second parameter of the `session` callback, when using a database.
   */
  interface User {
    discordId: string;
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
  adapter: UpstashRedisAdapter(redis),
  events: {
    async createUser({ user }) {
      // Initialise submission map
      await redis.json.set(
        `${RedisKeyNamespace.Submissions}:${user.id}`,
        '$',
        {},
      );
    },
  },
  providers: [
    Discord<DiscordProfile>({
      authorization: 'https://discord.com/api/oauth2/authorize?scope=identify',
      profile(profile) {
        function getProfileImage() {
          if (profile.avatar === null) {
            const defaultAvatarNumber =
              profile.discriminator === '0'
                ? // eslint-disable-next-line no-bitwise
                  Number(BigInt(profile.id) >> BigInt(22)) % 6
                : parseInt(profile.discriminator, 10) % 5;

            return `https://cdn.discordapp.com/embed/avatars/${defaultAvatarNumber}.png`;
          }

          const format = profile.avatar.startsWith('a_') ? 'gif' : 'png';

          return `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.${format}`;
        }

        return {
          name: profile.global_name ?? profile.username,
          image: getProfileImage(),
          discordId: profile.id,
        };
      },
    }),
  ],
} satisfies NextAuthConfig;

export const { handlers, signIn, signOut, auth } = NextAuth(config);
