import { clientConstants } from '@/config/constants.client';
import { CombatAchievementTier } from '@/app/schemas/osrs';
import { CombatAchievementTierThresholdResponse } from '@/app/schemas/wiki';
import * as Sentry from '@sentry/nextjs';
import { unstable_cache } from 'next/cache';

export const getCombatAchievementTierThresholds = unstable_cache(
  async (): Promise<Record<
    Exclude<CombatAchievementTier, 'None'>,
    number
  > | null> => {
    const query = [
      '{{Globals|ca easy points}}',
      '{{Globals|ca medium points}}',
      '{{Globals|ca hard points}}',
      '{{Globals|ca elite points}}',
      '{{Globals|ca master points}}',
      '{{Globals|ca gm points}}',
    ].join('|');

    const tierPointThresholdParams = new URLSearchParams({
      action: 'expandtemplates',
      format: 'json',
      text: query,
      prop: 'wikitext',
      formatversion: '2',
    }).toString();

    try {
      const response = await fetch(
        `${clientConstants.wiki.baseUrl}/api.php?${tierPointThresholdParams}`,
        {
          headers: {
            'User-Agent': clientConstants.wiki.userAgent,
          },
        },
      );

      const data = CombatAchievementTierThresholdResponse.parse(
        await response.json(),
      );

      const [
        easyPoints,
        mediumPoints,
        hardPoints,
        elitePoints,
        masterPoints,
        gmPoints,
      ] = data.expandtemplates.wikitext.split('|');

      return {
        Easy: Number(easyPoints),
        Medium: Number(mediumPoints),
        Hard: Number(hardPoints),
        Elite: Number(elitePoints),
        Master: Number(masterPoints),
        Grandmaster: Number(gmPoints),
      };
    } catch (error) {
      Sentry.captureException(error);

      return null;
    }
  },
  [],
  {
    revalidate: 60 * 60 * 24 * 7, // 7 days
  },
);
