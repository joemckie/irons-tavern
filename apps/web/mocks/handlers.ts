import { clientConstants } from '@/config/constants.client';
import { serverConstants } from '@/config/constants.server';
import { delay, http, HttpResponse, passthrough } from 'msw';
import { WikiSyncResponse } from '@/app/schemas/wiki';
import { ClanMember } from '@/app/api/update-member-list/route';
import { TempleOSRSPlayerStats } from '@/app/schemas/temple-api';
import * as wikiSync from './wiki-sync';
import * as templePlayerStats from './temple-player-stats';
import { memberListFixture } from './misc/member-list';
import { combatAchievementListFixture } from './wiki-data/combat-achievement-list';
import { combatAchievementTierFixture } from './wiki-data/combat-achievement-tiers';

const templePlayerStatsHandler = http.get(
  'https://templeosrs.com/api/player_stats.php',
  async ({ request }) => {
    const url = new URL(request.url);
    const player = url.searchParams.get('player');

    if (!player) {
      return HttpResponse.error();
    }

    await delay();

    switch (decodeURIComponent(player).toLowerCase()) {
      case 'riftletics':
        return HttpResponse.json<TempleOSRSPlayerStats>(
          templePlayerStats.earlyGamePlayerFixture,
        );
      case 'cousinofkos':
      case 'iron tyson':
        return HttpResponse.json<TempleOSRSPlayerStats>(
          templePlayerStats.midGamePlayerFixture,
        );
      case 'clogging':
        return HttpResponse.json<TempleOSRSPlayerStats>(
          templePlayerStats.endGamePlayerFixture,
        );
      default:
        return passthrough();
    }
  },
);

const wikiSyncHandler = http.get<{ player: string }>(
  `${clientConstants.wikiSync.baseUrl}/runelite/player/:player/STANDARD`,
  async ({ params }) => {
    await delay();

    switch (decodeURIComponent(params.player).toLowerCase()) {
      case 'riftletics':
        return HttpResponse.json<WikiSyncResponse>(
          wikiSync.earlyGamePlayerFixture,
        );
      case 'cousinofkos':
      case 'iron tyson':
        return HttpResponse.json<WikiSyncResponse>(
          wikiSync.midGamePlayerFixture,
        );
      case 'clogging':
        return HttpResponse.json<WikiSyncResponse>(
          wikiSync.endGamePlayerFixture,
        );
      default:
        return passthrough();
    }
  },
);

const wikiApiHandler = http.get(
  `${clientConstants.wiki.baseUrl}/api.php`,
  ({ request }) => {
    if (request.url.includes('Combat+Achievement+JSON')) {
      return HttpResponse.json(combatAchievementListFixture);
    }

    if (request.url.includes('ca+easy+points')) {
      return HttpResponse.json(combatAchievementTierFixture);
    }

    throw new Error(`No mock provided for ${request.url}`);
  },
);

const memberListHandler = http.get(
  'https://*.public.blob.vercel-storage.com/members-*.json',
  () => HttpResponse.json<ClanMember[]>(memberListFixture),
);

const passthroughHandlers = [
  'https://*.googleapis.com/*',
  'https://*.gstatic.com/*',
  `${clientConstants.publicUrl}/api/*`,
  'https://oldschool.runescape.wiki/images/*',
  'https://templeosrs.com/api/group_member_info.php',
  'https://discord.com/api/users/@me',
  'https://discord.com/api/oauth2/token',
  'https://discord.com/api/v10/channels/*/messages',
  `${serverConstants.redisUrl}/*`,
  'https://secure.runescape.com/m=hiscore_oldschool/index_lite.json',
  'https://*.sentry.io/*',
  'https://telemetry.nextjs.org/*',
  'http://localhost:3000/__nextjs_original-stack-frame',
  'http://localhost:8969/*',
  'http://localhost:42399/*',
].map((url) => http.all(url, passthrough));

export const handlers = [
  wikiSyncHandler,
  templePlayerStatsHandler,
  memberListHandler,
  wikiApiHandler,
  ...passthroughHandlers,
];
