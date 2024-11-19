import { AlertDialog, Button, Flex, Text } from '@radix-ui/themes';
import { useAction } from 'next-safe-action/hooks';
import { useFormContext } from 'react-hook-form';
import { deleteSubmissionDataAction } from '../[player]/actions/delete-submission-data-action';
import { RankCalculatorSchema } from '../[player]/submit-rank-calculator-validation';
import { actionToastMessage } from '../utils/action-toast-message';

type DeleteSubmissionDataDialogProps = Pick<
  AlertDialog.RootProps,
  'onOpenChange' | 'open'
>;

export function DeleteSubmissionDataDialog({
  open,
  onOpenChange,
}: DeleteSubmissionDataDialogProps) {
  const { getValues } = useFormContext<RankCalculatorSchema>();
  const {
    executeAsync: deleteSubmissionData,
    isExecuting: isDeleteSubmissionDataExecuting,
  } = useAction(deleteSubmissionDataAction);

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
            onClick={() => {
              actionToastMessage(
                deleteSubmissionData({
                  playerName: getValues('playerName'),
                }),
                { success: 'Submission data deleted!' },
              );

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
