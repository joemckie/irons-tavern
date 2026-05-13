import { PlayerName } from '@/app/schemas/player';
import { RankStructure } from '@/app/schemas/rank-calculator';
import { Rank } from '@/config/enums';
import { z } from 'zod';

const ModerateSubmissionSchema = z.object({
  submissionId: z.string().uuid(),
  submissionRankStructure: RankStructure,
  submissionPlayerName: PlayerName,
});

export const ApproveSubmissionSchema = ModerateSubmissionSchema.extend({
  rank: Rank,
});

export const RejectSubmissionSchema = ModerateSubmissionSchema;
