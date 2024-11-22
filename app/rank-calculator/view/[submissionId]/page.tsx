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
  RankSubmissionStatus,
} from '@/app/schemas/rank-calculator';
import { ReadonlyFormWrapper } from './readonly-form-wrapper';
import { RankCalculatorSchema } from '../../[player]/submit-rank-calculator-validation';
import { calculateDiffErrors } from './utils/calculate-diff-errors';

export default async function ViewSubmissionPage({
  params,
}: {
  params: Promise<{ submissionId: string }>;
}) {
  const { submissionId } = await params;
  const [submission, submissionStatus, submissionDiff] = await Promise.all([
    redis.json.get<Omit<RankCalculatorSchema, 'rank' | 'points'>>(
      rankSubmissionKey(submissionId),
    ),
    redis.hget<RankSubmissionStatus>(
      rankSubmissionMetadataKey(submissionId),
      'status',
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

  if (!submissionStatus) {
    throw new Error('Unable to determine submission status');
  }

  if (!submissionDiff) {
    throw new Error('Unable to find submission diff');
  }

  const user = await auth();

  const diffErrors = calculateDiffErrors(submissionDiff);

  return (
    <ReadonlyFormWrapper
      formData={submission}
      initialSubmissionStatus={submissionStatus}
      userPermissions={user?.user?.permissions}
      diffErrors={diffErrors}
    />
  );
}
