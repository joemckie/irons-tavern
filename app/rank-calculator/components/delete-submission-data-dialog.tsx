import { AlertDialog, Button, Flex, Text } from '@radix-ui/themes';
import { useAction } from 'next-safe-action/hooks';
import { toast } from 'react-toastify';
import { useFormContext } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { deleteSubmissionDataAction } from '../[player]/actions/delete-submission-data-action';
import { RankCalculatorSchema } from '../[player]/submit-rank-calculator-validation';

type DeleteSubmissionDataDialogProps = Pick<
  AlertDialog.RootProps,
  'onOpenChange' | 'open'
>;

export function DeleteSubmissionDataDialog({
  open,
  onOpenChange,
}: DeleteSubmissionDataDialogProps) {
  const router = useRouter();
  const { getValues } = useFormContext<RankCalculatorSchema>();
  const {
    executeAsync: deleteSubmissionData,
    isExecuting: isDeleteSubmissionDataExecuting,
  } = useAction(deleteSubmissionDataAction, {
    onError({ error: { serverError } }) {
      if (serverError) {
        toast.error(serverError);
      }
    },
    onSuccess() {
      toast.success('Submission data deleted!');
      router.refresh();
    },
  });

  return (
    <AlertDialog.Root open={open} onOpenChange={onOpenChange}>
      <AlertDialog.Content maxWidth="450px">
        <AlertDialog.Title>Delete submission data</AlertDialog.Title>
        <AlertDialog.Description size="2">
          <Text>
            Are you sure you want to delete your submission data? This can be
            useful if your data is not being merged correctly, but will require
            you to fill out the calculator again.
          </Text>
        </AlertDialog.Description>
        <Flex gap="3" mt="4" justify="end">
          <AlertDialog.Cancel>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </AlertDialog.Cancel>
          <Button
            loading={isDeleteSubmissionDataExecuting}
            variant="solid"
            color="red"
            onClick={async () => {
              await deleteSubmissionData({
                playerName: getValues('playerName'),
              });

              onOpenChange?.(false);
            }}
          >
            Delete
          </Button>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
}
