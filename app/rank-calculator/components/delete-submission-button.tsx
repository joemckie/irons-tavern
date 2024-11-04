'use client';

import { TrashIcon } from '@radix-ui/react-icons';
import { AlertDialog, Button, Flex, IconButton, Text } from '@radix-ui/themes';
import { useCallback } from 'react';
import { deletePlayerAccount } from '../actions/player-accounts';

interface DeleteSubmissionButtonProps {
  playerName: string;
}

export function DeleteSubmissionButton({
  playerName,
}: DeleteSubmissionButtonProps) {
  const handleDelete = useCallback(async () => {
    await deletePlayerAccount(playerName);
  }, [playerName]);

  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <IconButton color="red" variant="soft">
          <TrashIcon />
        </IconButton>
      </AlertDialog.Trigger>
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
            <Button variant="solid" color="red" onClick={handleDelete}>
              Remove account
            </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
}
