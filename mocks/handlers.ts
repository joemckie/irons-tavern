import { constants } from '@/config/constants';
import { delay, http, HttpResponse, passthrough } from 'msw';
import { WikiSyncResponse } from '@/types/wiki';
import { ClanMember } from '@/app/api/update-member-list/route';
import { CollectionLogResponse } from '@/types/collection-log';
import { TempleOSRSPlayerStats } from '@/types/temple-api';
import * as collectionLog from './collection-log';
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
        throw new Error(`No mock provided for ${request.url}`);
    }
  },
);

const collectionLogHandler = http.get<{ player: string }>(
  `${constants.collectionLogBaseUrl}/collectionlog/user/:player`,
  async ({ params, request }) => {
    await delay();

    switch (decodeURIComponent(params.player).toLowerCase()) {
      case 'riftletics':
        return HttpResponse.json<CollectionLogResponse>(
          collectionLog.earlyGamePlayerFixture,
        );
      case 'cousinofkos':
      case 'iron tyson':
        return HttpResponse.json<CollectionLogResponse>(
          collectionLog.midGamePlayerFixture,
        );
      case 'clogging':
        return HttpResponse.json<CollectionLogResponse>(
          collectionLog.endGamePlayerFixture,
        );
      default:
        throw new Error(`No mock provided for ${request.url}`);
    }
  },
);

const wikiSyncHandler = http.get<{ player: string }>(
  `${constants.wikiSync.baseUrl}/runelite/player/:player/STANDARD`,
  async ({ params, request }) => {
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
        throw new Error(`No mock provided for ${request.url}`);
    }
  },
);

const wikiApiHandler = http.get(
  `${constants.wiki.baseUrl}/api.php`,
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

// const redisHandler = http.post<
//   PathParams,
//   [string, string][],
//   { result: Omit<FormData, 'rank' | 'points'> }[]
// >(`${constants.redisUrl}/pipeline`, async ({ request }) => {
//   const [[method, key]] = await request.json();

//   if (method === 'JSON.GET') {
//     switch (key) {
//       case `${RedisKeyNamespace.Submission}:riftletics`:
//         return HttpResponse.json([{ result: formDataFixture.earlyGamePlayer }]);
//       case `${RedisKeyNamespace.Submission}:cousinofkos`:
//         return HttpResponse.json([{ result: formDataFixture.midGamePlayer }]);
//       case `${RedisKeyNamespace.Submission}:clogging`:
//         return HttpResponse.json([{ result: formDataFixture.endGamePlayer }]);
//       default:
//         return passthrough();
//     }
//   }

//   return passthrough();
// });

const passthroughHandlers = [
  'https://*.googleapis.com/*',
  'https://*.gstatic.com/*',
  `${constants.publicUrl}/api/*`,
  'https://oldschool.runescape.wiki/images/*',
  'https://templeosrs.com/api/group_member_info.php',
  'https://discord.com/api/users/@me',
  'https://discord.com/api/oauth2/token',
  'https://discord.com/api/v10/channels/*/messages',
  `${constants.redisUrl}/*`,
  'https://secure.runescape.com/m=hiscore_oldschool/index_lite.json',
  'https://*.sentry.io/*',
  'https://telemetry.nextjs.org/*',
  'http://localhost:3000/__nextjs_original-stack-frame',
].map((url) => http.all(url, passthrough));

export const handlers = [
  collectionLogHandler,
  wikiSyncHandler,
  templePlayerStatsHandler,
  memberListHandler,
  wikiApiHandler,
  ...passthroughHandlers,
];
