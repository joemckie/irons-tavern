import { rankSubmissionKey } from '@/config/redis';
import { FormData } from '@/types/rank-calculator';
import { Flex, Heading } from '@radix-ui/themes';
import { withAuth } from '@/app/utils/withAuth';
import { redis } from '@/redis';
import { ReadonlyFormWrapper } from './readonly-form-wrapper';

async function ViewSubmissionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const submission = await redis.json.get<Omit<FormData, 'rank' | 'points'>>(
    rankSubmissionKey(id),
  );

  if (!submission) {
    return (
      <Flex align="center" justify="center" height="100vh">
        <Heading>404 submission not found</Heading>
      </Flex>
    );
  }

  return <ReadonlyFormWrapper formData={submission} />;
}

export default withAuth(ViewSubmissionPage, ['Administrator', 'SendMessages']);
