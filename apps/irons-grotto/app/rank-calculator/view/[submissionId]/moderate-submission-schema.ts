import { Rank } from '@/config/enums';
import { z } from 'zod';

const ModerateSubmissionSchema = z.object({ submissionId: z.string().uuid() });

export const ApproveSubmissionSchema = ModerateSubmissionSchema.extend({
  rank: Rank,
});

export const RejectSubmissionSchema = ModerateSubmissionSchema;
