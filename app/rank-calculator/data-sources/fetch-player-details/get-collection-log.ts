import { clientConstants } from '@/config/constants.client';
import { CollectionLogResponse } from '@/app/schemas/collection-log';
import * as Sentry from '@sentry/nextjs';
import { ZodError } from 'zod';

export async function getCollectionLog(player: string) {
  try {
    const collectionLogResponse = await fetch(
      `${clientConstants.collectionLog.baseUrl}/collectionlog/user/${player}`,
    );

    if (!collectionLogResponse.ok) {
      throw new Error('collectionlog.net did not respond');
    }

    return CollectionLogResponse.parse(await collectionLogResponse.json());
  } catch (e) {
    if (e instanceof ZodError) {
      Sentry.captureMessage('Collection Log data not found', 'info');
    }

    if (
      e instanceof Error &&
      e.message === 'collectionlog.net did not respond'
    ) {
      Sentry.captureMessage(e.message, 'info');
    }

    return null;
  }
}
