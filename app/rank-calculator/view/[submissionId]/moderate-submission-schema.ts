import { RankStructure } from '@/app/schemas/rank-calculator';
import { Rank } from '@/config/enums';
import { z } from 'zod';

export const ModerateSubmissionSchema = z.object({
  submissionId: z.string().uuid(),
  rankStructure: RankStructure,
  rank: Rank,
});
