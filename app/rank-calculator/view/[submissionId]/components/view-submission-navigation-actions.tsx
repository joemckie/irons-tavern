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
}

export function ViewSubmissionNavigationActions({
  rankStructure,
  onStatusChange,
  submissionStatus,
}: ViewSubmissionNavigationActionsProps) {
  const { submissionId } = useParams<{ submissionId: string }>();
  const { rank } = useRankCalculator();

  const {
    executeAsync: approveSubmission,
    isExecuting: isApproveSubmissionExecuting,
  } = useAction(approveSubmissionAction);

  const handleApproveClick = async () => {
    const result = await approveSubmission({
      rank,
      rankStructure,
      submissionId,
      submissionStatus,
    });

    if (!result?.data?.success) {
      toast.error('Unable to approve submission!');
    }

    if (result?.data?.success) {
      toast.success('Submission approved!');
      onStatusChange('Approved');
    }
  };

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
        onClick={handleApproveClick}
      >
        Approve
      </Button>
    </>
  );
}
