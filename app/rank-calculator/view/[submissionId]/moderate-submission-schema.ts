import { PlayerName } from '@/app/schemas/player';
import {
  RankStructure,
  RankSubmissionStatus,
} from '@/app/schemas/rank-calculator';
import { Rank } from '@/config/enums';
import { z } from 'zod';

export const ModerateSubmissionSchema = z.object({
  submissionId: z.string().uuid(),
  playerName: PlayerName,
  rankStructure: RankStructure,
  rank: Rank,
  submissionStatus: RankSubmissionStatus,
});
