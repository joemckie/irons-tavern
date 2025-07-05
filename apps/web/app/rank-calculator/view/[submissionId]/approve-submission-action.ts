'use server';

import { authActionClient } from '@/app/safe-action';
import { ActionError } from '@/app/action-error';
import { userHasManageRolesPermission } from './utils/user-has-manage-roles-permission';
import { ApproveSubmissionSchema } from './moderate-submission-schema';
import { approveSubmission } from './utils/approve-submission';

export const approveSubmissionAction = authActionClient
  .metadata({ actionName: 'approve-submission' })
  .schema(ApproveSubmissionSchema)
  .action(
    async ({
      parsedInput: { submissionId, rank },
      ctx: { permissions, userId: approverId },
    }) => {
      if (!userHasManageRolesPermission(permissions)) {
        throw new ActionError(
          'You do not have permission to approve this submission',
        );
      }

      return approveSubmission({
        submissionId,
        rank,
        approverId,
      });
    },
  );
