import {
  TavernDiarySection,
  TavernDiaryTier,
} from '@/app/schemas/tavern-diaries';
import { StandardRank, type StaffRank } from './ranks';

export const rankDiscordRoles = {
  Helper: '1275198438971146240',
  Steel: '845833173416804392',
  Adamant: '846392447629262868',
  Rune: '846392037099962409',
  Dragon: '845832454090129428',
  Striker: '1275199994944688170',
  Expert: '845832341499019284',
  Knight: '845832086690463801',
  Paladin: '845831852543311872',
  Legend: '1275200753778036868',
  Natural: '845831429514723360',
  Sage: '846392933556682773',
  TzKal: '1275200867133558876',
  Skulled: '1275200966181916792',
  Beast: '1374495177904881714',
} satisfies Record<StandardRank, string>;

export const staffRankDiscordRoles = new Map([
  ['845828397505445958', 'Owner'],
  ['845830173797646376', 'Deputy Owner'],
  ['698256167004012667', 'Artisan'],
  ['1370146415984250971', 'Moderator'],
  ['1370127916247027803', 'Marshal'],
  ['1370127479167127692', 'Admiral'],
  ['1370127040778604745', 'Brigadier'],
  ['1370126581552648483', 'Colonel'],
  ['1370125488793714768', 'General'],
  ['1370124823992209448', 'Captain'],
]) satisfies Map<string, StaffRank>;

export const tavernDiaryDiscordRoles = {
  'Collection Log': new Map<TavernDiaryTier, string>([
    ['Drunkard', '1368972998744477807'],
    ['Bartender', '1368973172929724517'],
    ['Landlord', '1368973243876245564'],
    ['Baron', '1368973306493141042'],
    ['Duke', '1368973376542212126'],
  ]),
  Combat: new Map<TavernDiaryTier, string>([
    ['Drunkard', '1368972199494422590'],
    ['Bartender', '1368972375806181578'],
    ['Landlord', '1368972466474717214'],
    ['Baron', '1368972527522680894'],
    ['Duke', '1368972613338271744'],
  ]),
  Skilling: new Map<TavernDiaryTier, string>([
    ['Drunkard', '1368972674713387048'],
    ['Bartender', '1368972745681014784'],
    ['Landlord', '1368972813494386861'],
    ['Baron', '1368972884252295369'],
    ['Duke', '1368972944893542534'],
  ]),
} as const satisfies Record<TavernDiarySection, Map<TavernDiaryTier, string>>;

export const achievementDiscordRoles = {
  Grandmaster: '1042811412063465543',
  'Blood Torva': '1138949636103610489',
} as const;
