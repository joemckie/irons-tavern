import { useState, useTransition } from 'react';
import { AlertDialog, Button, Flex, Text } from '@radix-ui/themes';
import { useAction } from 'next-safe-action/hooks';
import { toast } from 'react-toastify';
import { useRankCalculator } from '@/app/rank-calculator/hooks/point-calculator/use-rank-calculator';
import { useParams } from 'next/navigation';
import { getRankName } from '@/app/rank-calculator/utils/get-rank-name';
import { useWatch } from 'react-hook-form';
import { RankCalculatorSchema } from '@/app/rank-calculator/[player]/submit-rank-calculator-validation';
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
  const rankStructure = useWatch<RankCalculatorSchema, 'rankStructure'>({
    name: 'rankStructure',
  });
  const isStandardRankStructure = rankStructure === 'Standard';

  const {
    executeAsync: approveSubmission,
    isExecuting: isApproveSubmissionExecuting,
  } = useAction(approveSubmissionAction);

  const handleApproveClick = async () => {
    const result = await approveSubmission({
      submissionId,
      rank,
    });

    if (result?.data?.success) {
      toast.success('Submission approved!');
      onApproveSuccess();

      return;
    }

    toast.error('Unable to approve submission!');
  };

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
          variant="soft"
          color="green"
        >
          Approve
        </Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content maxWidth="450px">
        <AlertDialog.Title>Approve application</AlertDialog.Title>
        <AlertDialog.Description size="2">
          {isStandardRankStructure && (
            <Text>
              This application will be approved and {playerName} will
              automatically be assigned the {getRankName(rank)} rank on Discord.
            </Text>
          )}
          {!isStandardRankStructure && (
            <Text>
              This application will be approved. Discord ranks must be manually
              assigned for non-standard rank structures.
            </Text>
          )}
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
          <AlertDialog.Action onClick={handleApproveClick}>
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
