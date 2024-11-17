import { RankSubmissionStatus } from '@/app/schemas/rank-calculator';
import { PermissionCalculator } from '@bloomlabs/permission-calculator';

export function userCanModerateSubmission(
  permissions: string | undefined,
  submissionStatus: RankSubmissionStatus,
) {
  return Boolean(
    permissions &&
      new PermissionCalculator(BigInt(permissions)).has('MANAGE_ROLES') &&
      submissionStatus === 'Pending',
  );
}
