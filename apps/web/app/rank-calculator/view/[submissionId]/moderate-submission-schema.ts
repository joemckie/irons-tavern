import { Rank } from '@/config/enums';
import type { UUID } from 'node:crypto';
import { z } from 'zod';

const ModerateSubmissionSchema = z.object({
  submissionId: z.uuid().pipe(z.custom<UUID>()),
});

export const ApproveSubmissionSchema = ModerateSubmissionSchema.extend({
  rank: Rank,
});

export const RejectSubmissionSchema = ModerateSubmissionSchema;
