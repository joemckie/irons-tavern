'use client';

import { TrashIcon } from '@radix-ui/react-icons';
import {
  AlertDialog,
  Button,
  Flex,
  IconButton,
  Text,
  Tooltip,
} from '@radix-ui/themes';

interface DeleteSubmissionButtonProps {
  playerName: string;
  deletePlayerAccountAction: (playerName: string) => void;
}

export function DeleteSubmissionButton({
  playerName,
  deletePlayerAccountAction,
}: DeleteSubmissionButtonProps) {
  return (
    <AlertDialog.Root>
      <Tooltip content="Delete">
        <AlertDialog.Trigger>
          <IconButton color="red" variant="soft">
            <TrashIcon />
          </IconButton>
        </AlertDialog.Trigger>
      </Tooltip>
      <AlertDialog.Content maxWidth="450px">
        <AlertDialog.Title>Remove account</AlertDialog.Title>
        <AlertDialog.Description size="2">
          <Text>
            Are you sure? {playerName} and any associated submissions will be
            deleted.
          </Text>
        </AlertDialog.Description>
        <Flex gap="3" mt="4" justify="end">
          <AlertDialog.Cancel>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Button
              variant="solid"
              color="red"
              onClick={() => {
                deletePlayerAccountAction(playerName);
              }}
            >
              Remove account
            </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
}
