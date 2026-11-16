import {
  createSafeActionClient,
  DEFAULT_SERVER_ERROR_MESSAGE,
} from 'next-safe-action';
import * as Sentry from '@sentry/nextjs';
import { z } from 'zod';
import { auth } from '@/auth';
import { ActionError } from './action-error';
import { connection } from 'next/server';
import { withRequestContext } from '@/database/db';

export const actionClient = createSafeActionClient({
  handleServerError(error) {
    console.error(`Action error: ${error.message}`);

    Sentry.captureException(error);

    if (error instanceof ActionError) {
      return error.message;
    }

    return DEFAULT_SERVER_ERROR_MESSAGE;
  },
  defineMetadataSchema() {
    return z.object({ actionName: z.string() });
  },
})
  // Give every action its own forked entity manager
  .use(async ({ next }) => withRequestContext(() => next()))
  .use(async ({ next, metadata }) =>
    Sentry.withServerActionInstrumentation(
      metadata.actionName,
      { recordResponse: true },
      next,
    ),
  );

export const authActionClient = actionClient.use(async ({ next }) => {
  await connection();

  const session = await auth();

  if (!session?.user?.id) {
    throw new Error('Session not found!');
  }

  return next({
    ctx: {
      userId: session.user.id,
      userName: session.user.name ?? session.user.id,
      permissions: session.user.permissions,
    },
  });
});
