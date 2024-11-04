import { Redis } from '@upstash/redis';

export const redis = Redis.fromEnv({
  keepAlive: false,
  retry: {
    retries: parseInt(process.env.REDIS_RETRIES ?? '0', 10),
  },
});
