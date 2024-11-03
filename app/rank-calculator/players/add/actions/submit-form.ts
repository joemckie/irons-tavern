'use server';

import { SubmitHandler } from 'react-hook-form';
import { savePlayerAccount } from '@/app/rank-calculator/actions/player-accounts';
import { redirect } from 'next/navigation';
import * as Sentry from '@sentry/nextjs';
import { FormData } from '../add-player-form';

export const submitForm: SubmitHandler<FormData> = async ({
  playerName,
  joinDate,
}) => {
  try {
    const result = await savePlayerAccount(playerName, joinDate);

    if (result !== 'OK') {
      throw new Error('Unable to save player');
    }
  } catch (error) {
    Sentry.captureException(error);

    return;
  }

  redirect(`/rank-calculator/${playerName}`);
};
