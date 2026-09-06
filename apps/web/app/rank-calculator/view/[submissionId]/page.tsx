import {
  rankSubmissionDiffKey,
  rankSubmissionKey,
  rankSubmissionMetadataKey,
} from '@/config/redis';
import { Flex, Heading } from '@radix-ui/themes';
import { redis } from '@/redis';
import { auth } from '@/auth';
import {
  RankSubmissionDiff,
  RankSubmissionMetadata,
} from '@/app/schemas/rank-calculator';

import { ReadonlyFormWrapper } from './readonly-form-wrapper';
import { RankCalculatorSchema } from '../../[player]/submit-rank-calculator-validation';
import { calculateDiffErrors } from './utils/calculate-diff-errors';
import { getDiscordUsername } from './get-discord-username';
import {
  fetchItemDropRates,
  generateRequiredItemList,
} from '../../data-sources/fetch-dropped-item-info';
import { buildNotableItemList } from '../../utils/build-notable-item-list';
import { connection } from 'next/server';

// TODO: Cache Components adoption. Refactor this route so this opt-out can be removed.
// See: https://nextjs.org/docs/app/guides/migrating-to-cache-components
export const instant = false;

export default async function ViewSubmissionPage({
  params,
}: PageProps<'/rank-calculator/view/[submissionId]'>) {
  const { submissionId } = await params;
  const [submission, submissionMetadata, submissionDiff] = await Promise.all([
    redis.json.get<Omit<RankCalculatorSchema, 'rank' | 'points'>>(
      rankSubmissionKey(submissionId),
    ),
    redis.hgetall<RankSubmissionMetadata>(
      rankSubmissionMetadataKey(submissionId),
    ),
    redis.hgetall<RankSubmissionDiff>(rankSubmissionDiffKey(submissionId)),
  ]);

  if (!submission) {
    return (
      <Flex align="center" justify="center" height="100vh">
        <Heading>404 submission not found</Heading>
      </Flex>
    );
  }

  if (!submissionMetadata) {
    throw new Error('Unable to find submission metadata');
  }

  if (!submissionDiff) {
    throw new Error('Unable to find submission diff');
  }

  await connection();

  const user = await auth();

  const diffErrors = calculateDiffErrors(submissionDiff);

  const actionedByUsername = await getDiscordUsername(
    submissionMetadata.actionedBy,
  );

  const dropRates = await fetchItemDropRates([...generateRequiredItemList()]);
  const notableItemList = await buildNotableItemList(dropRates);

  return (
    <ReadonlyFormWrapper
      formData={submission}
      userPermissions={user?.user?.permissions}
      diffErrors={diffErrors}
      submissionMetadata={submissionMetadata}
      actionedByUsername={actionedByUsername}
      itemList={Object.entries(notableItemList)}
    />
  );
}
