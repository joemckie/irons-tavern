'use client';

import { TrashIcon } from '@radix-ui/react-icons';
import { IconButton } from '@radix-ui/themes';
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
    <IconButton color="red" variant="soft" onClick={handleDelete}>
      <TrashIcon />
    </IconButton>
  );
}
