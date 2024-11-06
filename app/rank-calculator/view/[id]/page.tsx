import { rankSubmissionKey } from '@/config/redis';
import { Flex, Heading } from '@radix-ui/themes';
import { redis } from '@/redis';
import { ReadonlyFormWrapper } from './readonly-form-wrapper';
import { RankCalculatorSchema } from '../../[player]/submit-rank-calculator-validation';

export default async function ViewSubmissionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const submission = await redis.json.get<
    Omit<RankCalculatorSchema, 'rank' | 'points'>
  >(rankSubmissionKey(id));

  if (!submission) {
    return (
      <Flex align="center" justify="center" height="100vh">
        <Heading>404 submission not found</Heading>
      </Flex>
    );
  }

  return <ReadonlyFormWrapper formData={submission} />;
}
