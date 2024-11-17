import { PermissionCalculator } from '@bloomlabs/permission-calculator';

export function userCanModerateSubmission(permissions: string | undefined) {
  return Boolean(
    permissions &&
      new PermissionCalculator(BigInt(permissions)).has('MANAGE_ROLES'),
  );
}
