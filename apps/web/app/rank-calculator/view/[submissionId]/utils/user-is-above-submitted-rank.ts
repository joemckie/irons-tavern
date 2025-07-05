import type { Rank } from '@/config/enums';
import { StaffRank } from '@/config/ranks';

export function userRankOutranksSubmissionRank(
  userRank: StaffRank,
  submittedRank: Rank,
) {
  try {
    const userRankPosition = StaffRank.options.indexOf(
      StaffRank.parse(userRank),
    );

    try {
      const submittedRankPosition = StaffRank.options.indexOf(
        StaffRank.parse(submittedRank),
      );

      // Submitted rank should be below the user's rank to be considered outranked
      return submittedRankPosition < userRankPosition;
    } catch {
      // Logged in user is staff, and the submitted rank is not a staff rank
      return true;
    }
  } catch {
    // Logged in user is not staff
    return false;
  }
}
