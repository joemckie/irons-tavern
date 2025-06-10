import { useState, useTransition } from 'react';
import { AlertDialog, Button, Flex, Text } from '@radix-ui/themes';
import { useAction } from 'next-safe-action/hooks';
import { useRankCalculator } from '@/app/rank-calculator/hooks/point-calculator/use-rank-calculator';
import { useParams } from 'next/navigation';
import { getRankName } from '@/app/rank-calculator/utils/get-rank-name';
import { useFormState, useWatch } from 'react-hook-form';
import { RankCalculatorSchema } from '@/app/rank-calculator/[player]/submit-rank-calculator-validation';
import { handleToastUpdates } from '@/app/rank-calculator/utils/handle-toast-updates';
import { approveSubmissionAction } from '../approve-submission-action';

interface ApproveSubmissionButtonProps {
  playerName: string;
  onApproveSuccess: () => void;
}

export function ApproveSubmissionButton({
  playerName,
  onApproveSuccess,
}: ApproveSubmissionButtonProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDialogTransitioning, startTransition] = useTransition();
  const { rank } = useRankCalculator();
  const { submissionId } = useParams<{ submissionId: string }>();
  const rankStructure = useWatch<RankCalculatorSchema, 'rankStructure'>({
    name: 'rankStructure',
  });
  const isStandardRankStructure = rankStructure === 'Standard';
  const { errors } = useFormState();

  const {
    executeAsync: approveSubmission,
    isExecuting: isApproveSubmissionExecuting,
  } = useAction(approveSubmissionAction);

  return (
    <AlertDialog.Root open={isDialogOpen}>
      <AlertDialog.Trigger>
        <Button
          loading={isDialogTransitioning}
          role="button"
          type="button"
          variant="soft"
          color="green"
          onClick={() => {
            startTransition(() => {
              setIsDialogOpen(true);
            });
          }}
        >
          Approve
        </Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content maxWidth="450px">
        <AlertDialog.Title>Approve application</AlertDialog.Title>
        <AlertDialog.Description size="2">
          {Object.keys(errors).length > 0 && (
            <>
              <Text as="p" color="red" weight="bold">
                WARNING: Differences found between the submission and API
                responses!
              </Text>
              <br />
            </>
          )}
          {isStandardRankStructure && (
            <Text as="p">
              This application will be approved and {playerName} will
              automatically be assigned the {getRankName(rank)} rank on Discord.
            </Text>
          )}
          {!isStandardRankStructure && (
            <Text as="p">
              This application will be approved. Discord ranks must be manually
              assigned for non-standard rank structures.
            </Text>
          )}
          <br />
          <Text>No in-game ranks will be changed.</Text>
        </AlertDialog.Description>
        <Flex gap="3" mt="4" justify="end">
          <AlertDialog.Cancel
            onClick={() => {
              setIsDialogOpen(false);
            }}
          >
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action
            onClick={() => {
              void handleToastUpdates(
                approveSubmission({
                  submissionId,
                  rank,
                }),
                {
                  success: {
                    render() {
                      onApproveSuccess();

                      return 'Submission approved!';
                    },
                  },
                },
              );

              setIsDialogOpen(false);
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
