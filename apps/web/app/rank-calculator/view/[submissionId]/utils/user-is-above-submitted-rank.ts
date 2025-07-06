import type { Rank } from '@/config/enums';
import { StaffRank, staffRankTiers } from '@/config/ranks';

export function userRankOutranksSubmissionRank(
  userRank: StaffRank,
  submittedRank: Rank,
) {
  try {
    const userRankPosition = staffRankTiers[userRank];

    try {
      const submittedRankPosition =
        staffRankTiers[StaffRank.parse(submittedRank)];

      // Enforce hierarchy: user rank must be equal to or higher than submitted rank
      return submittedRankPosition <= userRankPosition;
    } catch {
      // Logged in user is staff, and the submitted rank is not a staff rank
      return true;
    }
  } catch {
    // Logged in user is not staff
    return false;
  }
}
