'use server';

import { authActionClient } from '@/app/safe-action';
import { ActionError } from '@/app/action-error';
import { userCanModerateSubmission } from './utils/user-can-moderate-submission';
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
      if (!userCanModerateSubmission(permissions)) {
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
