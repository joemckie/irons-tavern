import { Button } from '@radix-ui/themes';
import { useParams } from 'next/navigation';
import { useAction } from 'next-safe-action/hooks';
import { RankStructure } from '@/app/schemas/rank-calculator';
import { toast } from 'react-toastify';
import { approveSubmissionAction } from '../approve-submission-action';

interface ViewSubmissionNavigationActionsProps {
  rankStructure: RankStructure;
}

export function ViewSubmissionNavigationActions({
  rankStructure,
}: ViewSubmissionNavigationActionsProps) {
  const { submissionId } = useParams<{ submissionId: string }>();

  const {
    executeAsync: approveSubmission,
    isExecuting: isApproveSubmissionExecuting,
  } = useAction(approveSubmissionAction);

  const handleApproveClick = async () => {
    const result = await approveSubmission({
      rankStructure,
      submissionId,
    });

    if (result?.serverError) {
      toast.error('Unable to approve submission!');
    }

    if (result?.data?.success) {
      toast.success('Submission approved!');
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
