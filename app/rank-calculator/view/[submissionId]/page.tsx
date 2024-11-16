import { rankSubmissionKey } from '@/config/redis';
import { Flex, Heading } from '@radix-ui/themes';
import { redis } from '@/redis';
import { auth } from '@/auth';
import { PermissionCalculator } from '@bloomlabs/permission-calculator';
import { ReadonlyFormWrapper } from './readonly-form-wrapper';
import { RankCalculatorSchema } from '../../[player]/submit-rank-calculator-validation';

export default async function ViewSubmissionPage({
  params,
}: {
  params: Promise<{ submissionId: string }>;
}) {
  const { submissionId } = await params;
  const submission = await redis.json.get<
    Omit<RankCalculatorSchema, 'rank' | 'points'>
  >(rankSubmissionKey(submissionId));

  if (!submission) {
    return (
      <Flex align="center" justify="center" height="100vh">
        <Heading>404 submission not found</Heading>
      </Flex>
    );
  }

  const user = await auth();
  const permissions = new PermissionCalculator(
    BigInt(user?.user?.permissions ?? ''),
  );

  return (
    <ReadonlyFormWrapper
      formData={submission}
      userHasManageRolesPermission={permissions.has('MANAGE_ROLES')}
    />
  );
}
