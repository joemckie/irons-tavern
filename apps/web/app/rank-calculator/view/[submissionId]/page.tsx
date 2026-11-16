import { Flex, Heading } from '@radix-ui/themes';
import { z } from 'zod';
import { auth } from '@/auth';
import { initORM, withRequestContext } from '@/database/db';
import { RankSubmission } from '@/database/entities/rank-submission.entity';
import { ReadonlyFormWrapper } from './readonly-form-wrapper';
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
  await connection();

  const { submissionId } = await params;

  const { success: isValidSubmissionId, data: parsedSubmissionId } = z
    .uuid()
    .safeParse(submissionId);

  if (!isValidSubmissionId) {
    return (
      <Flex align="center" justify="center" height="100vh">
        <Heading>404 submission not found</Heading>
      </Flex>
    );
  }

  const submission = await withRequestContext(async () => {
    const { em } = await initORM();
    const result = await em.findOne(RankSubmission, { id: parsedSubmissionId });

    if (!result) {
      return null;
    }

    return result;
  });

  if (!submission) {
    return (
      <Flex align="center" justify="center" height="100vh">
        <Heading>404 submission not found</Heading>
      </Flex>
    );
  }

  const {
    data: formData,
    metadata: submissionMetadata,
    diff: submissionDiff,
  } = submission;

  const user = await auth();

  const diffErrors = calculateDiffErrors(submissionDiff);

  const actionedByUsername = await getDiscordUsername(
    submissionMetadata.actionedBy,
  );

  const dropRates = await fetchItemDropRates([...generateRequiredItemList()]);
  const notableItemList = await buildNotableItemList(dropRates);

  return (
    <ReadonlyFormWrapper
      formData={formData}
      userPermissions={user?.user?.permissions}
      diffErrors={diffErrors}
      submissionMetadata={{ ...submissionMetadata }}
      actionedByUsername={actionedByUsername}
      itemList={Object.entries(notableItemList)}
    />
  );
}
