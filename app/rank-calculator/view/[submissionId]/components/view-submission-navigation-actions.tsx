import { RankSubmissionStatus } from '@/app/schemas/rank-calculator';
import { RejectSubmissionButton } from './reject-submission-button';
import { ApproveSubmissionButton } from './approve-submission-button';

interface ViewSubmissionNavigationActionsProps {
  onStatusChange: (status: RankSubmissionStatus) => void;
  playerName: string;
}

export function ViewSubmissionNavigationActions({
  onStatusChange,
  playerName,
}: ViewSubmissionNavigationActionsProps) {
  return (
    <>
      <RejectSubmissionButton
        onRejectSuccess={() => {
          onStatusChange('Rejected');
        }}
      />
      <ApproveSubmissionButton
        onApproveSuccess={() => {
          onStatusChange('Approved');
        }}
        playerName={playerName}
      />
    </>
  );
}
