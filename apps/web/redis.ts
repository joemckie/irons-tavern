import { Redis, RedisConfigNodejs } from '@upstash/redis';

const redisConfig = {
  keepAlive: false,
  retry: {
    retries: parseInt(process.env.REDIS_RETRIES ?? '0', 10),
  },
} satisfies Omit<RedisConfigNodejs, 'url' | 'token'>;

export const redis = Redis.fromEnv(redisConfig);

/**
 * In some cases, the redis client will attempt to deserialise data and change its values
 * (like when turning a large string into a number)
 *
 * This client can be used as a workaround in those cases
 */
export const redisRaw = Redis.fromEnv({
  ...redisConfig,
  automaticDeserialization: false,
});
