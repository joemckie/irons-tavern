import * as Sentry from '@sentry/nextjs';
import { clientConstants } from '@/config/constants.client';
import { TempleOSRSGroupCollectionLog } from '@/app/schemas/temple-api';
import { generateCollectionLogCategoryList } from './utils/generate-collection-log-category-list';
import { serverConstants } from '@/config/constants.server';

export async function fetchTempleGroupCollectionLog() {
  const categories = generateCollectionLogCategoryList();

  try {
    const collectionLogQueryParams = new URLSearchParams({
      group: serverConstants.temple.groupId,
      includecount: '1',
      categories: [...categories].join(','),
    });

    const collectionLogResponse = await fetch(
      `${clientConstants.temple.baseUrl}/api/collection-log/group_collection_log.php?${collectionLogQueryParams}`,
    );

    return TempleOSRSGroupCollectionLog.parse(
      await collectionLogResponse.json(),
    ).data;
  } catch {
    Sentry.captureException('Failed to fetch TempleOSRS group collection log');

    return null;
  }
}
