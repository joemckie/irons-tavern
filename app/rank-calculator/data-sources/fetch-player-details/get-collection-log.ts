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
      Sentry.captureMessage('collectionlog.net did not respond', 'info');

      return {
        data: null,
        error: 'collectionlog.net did not respond',
      };
    }

    return {
      data: CollectionLogResponse.parse(await collectionLogResponse.json()),
    };
  } catch (e) {
    if (e instanceof ZodError) {
      Sentry.captureMessage('Collection Log data not found', 'info');
    }

    return {
      data: null,
    };
  }
}
