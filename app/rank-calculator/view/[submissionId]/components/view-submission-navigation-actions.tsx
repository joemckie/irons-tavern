import { useEffect } from 'react';
import { Button } from '@radix-ui/themes';
import { useParams } from 'next/navigation';
import { useAction } from 'next-safe-action/hooks';
import {
  RankStructure,
  RankSubmissionStatus,
} from '@/app/schemas/rank-calculator';
import { toast } from 'react-toastify';
import { useRankCalculator } from '@/app/rank-calculator/hooks/point-calculator/use-rank-calculator';
import { approveSubmissionAction } from '../approve-submission-action';

interface ViewSubmissionNavigationActionsProps {
  rankStructure: RankStructure;
  onStatusChange: (status: RankSubmissionStatus) => void;
  submissionStatus: RankSubmissionStatus;
  playerName: string;
}

export function ViewSubmissionNavigationActions({
  rankStructure,
  onStatusChange,
  submissionStatus,
  playerName,
}: ViewSubmissionNavigationActionsProps) {
  const { submissionId } = useParams<{ submissionId: string }>();
  const { rank } = useRankCalculator();

  const {
    execute: approveSubmission,
    isExecuting: isApproveSubmissionExecuting,
    status: approveSubmissionStatus,
  } = useAction(approveSubmissionAction);

  useEffect(() => {
    if (approveSubmissionStatus === 'hasErrored') {
      toast.error('Unable to approve submission!');
    }

    if (approveSubmissionStatus === 'hasSucceeded') {
      toast.success('Submission approved!');
      onStatusChange('Approved');
    }
  }, [approveSubmissionStatus, onStatusChange]);

  return (
    <>
      <Button variant="surface" color="red" type="button">
        Reject
      </Button>
      <Button
        loading={isApproveSubmissionExecuting}
        role="button"
        type="button"
        variant="surface"
        color="green"
        onClick={() => {
          approveSubmission({
            rank,
            rankStructure,
            submissionId,
            submissionStatus,
            playerName,
          });
        }}
      >
        Approve
      </Button>
    </>
  );
}
