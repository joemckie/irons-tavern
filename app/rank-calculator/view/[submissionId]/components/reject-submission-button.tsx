import { useState, useTransition } from 'react';
import { AlertDialog, Button, Flex, Text } from '@radix-ui/themes';
import { useAction } from 'next-safe-action/hooks';
import { useParams } from 'next/navigation';
import { toast } from 'react-toastify';
import { rejectSubmissionAction } from '../reject-submission-action';

interface RejectSubmissionButtonProps {
  onRejectSuccess: () => void;
}

export function RejectSubmissionButton({
  onRejectSuccess,
}: RejectSubmissionButtonProps) {
  const { submissionId } = useParams<{ submissionId: string }>();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDialogTransitioning, startTransition] = useTransition();
  const {
    executeAsync: rejectSubmission,
    isExecuting: isRejectSubmissionExecuting,
  } = useAction(rejectSubmissionAction, {
    onSuccess() {
      toast.success('Submission rejected!');
      onRejectSuccess();
    },
    onError({ error: { serverError } }) {
      if (serverError) {
        toast.error(serverError);
      }
    },
  });

  return (
    <AlertDialog.Root open={isDialogOpen}>
      <AlertDialog.Trigger>
        <Button
          loading={isDialogTransitioning}
          variant="soft"
          color="red"
          type="button"
          onClick={() => {
            startTransition(() => {
              setIsDialogOpen(true);
            });
          }}
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
            onClick={async () => {
              await rejectSubmission({
                submissionId,
              });

              setIsDialogOpen(false);
            }}
          >
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
