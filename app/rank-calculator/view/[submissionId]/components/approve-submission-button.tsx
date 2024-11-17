import { useEffect, useState, useTransition } from 'react';
import { AlertDialog, Button, Flex, Text } from '@radix-ui/themes';
import { useAction } from 'next-safe-action/hooks';
import { toast } from 'react-toastify';
import { useRankCalculator } from '@/app/rank-calculator/hooks/point-calculator/use-rank-calculator';
import { useParams } from 'next/navigation';
import { getRankName } from '@/app/rank-calculator/utils/get-rank-name';
import { approveSubmissionAction } from '../approve-submission-action';

interface ApproveSubmissionButtonProps {
  playerName: string;
  onApproveSuccess: () => void;
}

export function ApproveSubmissionButton({
  playerName,
  onApproveSuccess,
}: ApproveSubmissionButtonProps) {
  const [isApproveDialogOpen, setIsApproveDialogOpen] = useState(false);
  const [isApproveDialogTransitioning, startTransition] = useTransition();
  const { rank } = useRankCalculator();
  const { submissionId } = useParams<{ submissionId: string }>();

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
      onApproveSuccess();
    }
  }, [approveSubmissionStatus, onApproveSuccess]);

  return (
    <AlertDialog.Root
      open={isApproveDialogOpen}
      onOpenChange={(open) => {
        startTransition(() => {
          setIsApproveDialogOpen(open);
        });
      }}
    >
      <AlertDialog.Trigger>
        <Button
          loading={isApproveDialogTransitioning}
          role="button"
          type="button"
          variant="surface"
          color="green"
        >
          Approve
        </Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content maxWidth="450px">
        <AlertDialog.Title>Approve application</AlertDialog.Title>
        <AlertDialog.Description size="2">
          <Text>
            This application will be approved and {playerName} will
            automatically be assigned the {getRankName(rank)} rank on Discord.
          </Text>
          <br />
          <br />
          <Text>No in-game ranks will be changed.</Text>
        </AlertDialog.Description>
        <Flex gap="3" mt="4" justify="end">
          <AlertDialog.Cancel>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action
            onClick={() => {
              approveSubmission({
                submissionId,
                rank,
              });
            }}
          >
            <Button
              loading={isApproveSubmissionExecuting}
              variant="solid"
              color="green"
            >
              Approve
            </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
}
