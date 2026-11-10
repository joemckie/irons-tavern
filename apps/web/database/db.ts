import {
  MikroORM,
  RequestContext,
  type EntityManager,
  type Options,
} from '@mikro-orm/postgresql';
import config from '../mikro-orm.config';

export interface Services {
  orm: MikroORM;
  em: EntityManager;
}

let cache: Services;

export async function initORM(options?: Partial<Options>): Promise<Services> {
  if (cache) {
    return cache;
  }

  const orm = await MikroORM.init({
    ...config,
    ...options,
    migrations: {
      ...config.migrations,
      // The snapshot is only needed by the CLI when creating migrations.
      // Writing it at runtime pollutes the repo and fails on read-only filesystems.
      snapshot: false,
      ...options?.migrations,
    },
  });

  // Run pending migrations on startup
  await orm.migrator.up();

  return (cache = { orm, em: orm.em });
}

export async function withRequestContext<T>(
  callback: () => Promise<T>,
): Promise<T> {
  const { orm } = await initORM();

  return RequestContext.create(orm.em, callback);
}
