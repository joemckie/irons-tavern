import {
  RankStructure,
  RankSubmissionStatus,
} from '@/app/schemas/rank-calculator';
import { PermissionCalculator } from '@bloomlabs/permission-calculator';

export function userCanModerateSubmission(
  permissions: string | undefined,
  rankStructure: RankStructure,
  submissionStatus: RankSubmissionStatus,
) {
  return Boolean(
    permissions &&
      new PermissionCalculator(BigInt(permissions)).has('MANAGE_ROLES') &&
      rankStructure === 'Standard' &&
      submissionStatus === 'Pending',
  );
}
