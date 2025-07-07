'use server';

import { authActionClient } from '@/app/safe-action';
import { ActionError } from '@/app/action-error';
import { ApproveSubmissionSchema } from './moderate-submission-schema';
import { approveSubmission } from './utils/approve-submission';
import { userCanModerateSubmission } from './utils/user-can-moderate-submission';

export const approveSubmissionAction = authActionClient
  .metadata({ actionName: 'approve-submission' })
  .schema(ApproveSubmissionSchema)
  .action(
    async ({
      parsedInput: {
        submissionId,
        rank,
        submissionRankStructure,
        submissionPlayerName,
      },
      ctx: { permissions, userId: approverId },
    }) => {
      const userHasPermissions = await userCanModerateSubmission(
        permissions,
        approverId,
        submissionId,
        submissionRankStructure,
        submissionPlayerName,
      );

      if (!userHasPermissions) {
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
