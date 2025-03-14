import { clientConstants } from '@/config/constants.client';
import * as Sentry from '@sentry/nextjs';
import { TempleOSRSConstants } from '@/app/schemas/temple-api';

export async function fetchTempleConstants() {
  try {
    const templeConstantsResponse = await fetch(
      `${clientConstants.temple.baseUrl}/api/max_constants_list.php`,
    );

    return TempleOSRSConstants.parse(await templeConstantsResponse.json()).data;
  } catch {
    Sentry.captureMessage('Unable to fetch TempleOSRS constants', 'info');

    return null;
  }
}
