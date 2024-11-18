import { useState, useTransition } from 'react';
import { AlertDialog, Button, Flex, Text } from '@radix-ui/themes';
import { useAction } from 'next-safe-action/hooks';
import { toast } from 'react-toastify';
import { useParams } from 'next/navigation';
import { rejectSubmissionAction } from '../reject-submission-action';

interface RejectSubmissionButtonProps {
  onRejectSuccess: () => void;
}

export function RejectSubmissionButton({
  onRejectSuccess,
}: RejectSubmissionButtonProps) {
  const { submissionId } = useParams<{ submissionId: string }>();
  const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false);
  const [isRejectDialogTransitioning, startTransition] = useTransition();
  const {
    executeAsync: rejectSubmission,
    isExecuting: isRejectSubmissionExecuting,
  } = useAction(rejectSubmissionAction);

  const handleRejectClick = async () => {
    const result = await rejectSubmission({
      submissionId,
    });

    if (result?.data?.success) {
      toast.success('Submission rejected');
      onRejectSuccess();

      return;
    }

    toast.error('Unable to reject submission');
  };

  return (
    <AlertDialog.Root
      open={isRejectDialogOpen}
      onOpenChange={(open) => {
        startTransition(() => {
          setIsRejectDialogOpen(open);
        });
      }}
    >
      <AlertDialog.Trigger>
        <Button
          loading={isRejectDialogTransitioning}
          variant="surface"
          color="red"
          type="button"
        >
          Reject
        </Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content maxWidth="450px">
        <AlertDialog.Title>Reject application</AlertDialog.Title>
        <AlertDialog.Description size="2">
          <Text>This application will be rejected and cannot be reverted.</Text>
          <br />
          <br />
          <Text>In-game and Discord ranks will not be changed.</Text>
        </AlertDialog.Description>
        <Flex gap="3" mt="4" justify="end">
          <AlertDialog.Cancel>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action onClick={handleRejectClick}>
            <Button
              loading={isRejectSubmissionExecuting}
              variant="solid"
              color="red"
            >
              Reject
            </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
}
