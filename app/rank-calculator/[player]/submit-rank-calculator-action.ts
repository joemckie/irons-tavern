'use server';

import { formatNumber } from '@/app/rank-calculator/utils/format-number';
import { rankSubmissionKey, userRankSubmissionsKey } from '@/config/redis';
import { randomUUID } from 'crypto';
import { sendDiscordMessage } from '@/app/rank-calculator/utils/send-discord-message';
import { constants } from '@/config/constants';
import { pickBy } from 'lodash';
import { format } from 'date-fns';
import { redis } from '@/redis';
import { authActionClient } from '@/app/safe-action';
import { calculateScaling } from '../utils/calculate-scaling';
import { formatPercentage } from '../utils/format-percentage';
import { RankCalculatorSchema } from './submit-rank-calculator-validation';
import { getRankName } from '../utils/get-rank-name';
import { getRankImageUrl } from '../utils/get-rank-image-url';

export const submitRankCalculatorAction = authActionClient
  .metadata({
    actionName: 'submit-rank-calculator',
  })
  .schema(RankCalculatorSchema)
  .action(
    async ({ parsedInput: { rank, points, ...data }, ctx: { userId } }) => {
      if (!process.env.DISCORD_CHANNEL_ID) {
        throw new Error('No discord channel ID provided');
      }

      const formattedData = {
        ...data,
        acquiredItems: pickBy(data.acquiredItems, (val) => val),
      } satisfies Omit<RankCalculatorSchema, 'rank' | 'points'>;
      const submissionId = randomUUID();
      const submissionTransaction = redis.multi();

      submissionTransaction.json.set(
        rankSubmissionKey(submissionId),
        '$',
        formattedData,
        { nx: true },
      );

      submissionTransaction.lpush(
        userRankSubmissionsKey(userId, data.playerName),
        rankSubmissionKey(submissionId),
      );

      const submissionResult = await submissionTransaction.exec();

      if (!submissionResult) {
        return {
          success: false,
        };
      }

      await sendDiscordMessage(
        {
          embeds: [
            {
              title: `${data.playerName} rank application`,
              thumbnail: {
                url: getRankImageUrl(rank, true),
              },
              fields: [
                {
                  name: 'Rank',
                  value: getRankName(rank),
                  inline: true,
                },
                {
                  name: 'Rank structure',
                  value: data.rankStructure,
                  inline: true,
                },
                {
                  name: 'Total points',
                  value: formatNumber(points),
                  inline: true,
                },
                {
                  name: 'Join date',
                  value: format(data.joinDate, 'dd MMM yyyy'),
                  inline: true,
                },
                {
                  name: 'Scaling',
                  value: formatPercentage(calculateScaling(data.joinDate)),
                  inline: true,
                },
                {
                  name: 'User',
                  value: `<@${userId}>`,
                  inline: true,
                },
                {
                  name: 'View link',
                  value: `[Click to view submission](${constants.publicUrl}/rank-calculator/view/${submissionId})`,
                },
              ],
            },
          ],
        },
        process.env.DISCORD_CHANNEL_ID,
      );

      return {
        success: true,
      };
    },
  );
