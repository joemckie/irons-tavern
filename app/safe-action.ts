import {
  createSafeActionClient,
  DEFAULT_SERVER_ERROR_MESSAGE,
} from 'next-safe-action';
import * as Sentry from '@sentry/nextjs';
import { z } from 'zod';
import { auth } from '@/auth';

export class ActionError extends Error {}

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
    return z.object({
      actionName: z.string(),
    });
  },
})
  .use(async ({ next, clientInput, metadata }) => {
    const result = await next();

    if (process.env.NODE_ENV === 'development') {
      console.log(`Input: ${JSON.stringify(clientInput, null, 2)}`);
      console.log(`Result: ${JSON.stringify(result, null, 2)}`);
      console.log(`Metadata: ${JSON.stringify(metadata, null, 2)}`);
    }

    return result;
  })
  .use(async ({ next, metadata }) =>
    Sentry.withServerActionInstrumentation(metadata.actionName, next),
  );

export const authActionClient = actionClient.use(async ({ next }) => {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error('Session not found!');
  }

  return next({
    ctx: {
      userId: session.user.id,
      permissions: session.user.permissions,
    },
  });
});
