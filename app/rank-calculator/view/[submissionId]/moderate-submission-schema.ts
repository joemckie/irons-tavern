import { RankStructure } from '@/app/schemas/rank-calculator';
import { z } from 'zod';

export const ModerateSubmissionSchema = z.object({
  submissionId: z.string().uuid(),
  rankStructure: RankStructure,
});
