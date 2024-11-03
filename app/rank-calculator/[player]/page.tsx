import { SubmitHandler } from 'react-hook-form';
import { FormData } from '@/types/rank-calculator';
import * as Sentry from '@sentry/nextjs';
import { FormWrapper } from './form-wrapper';
import { getPlayerDetails } from '../utils/get-player-details';
import { submitRankCalculator } from '../actions/submit-rank-calculator';

interface Params {
  player: string;
}

export default async function RankCalculatorPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { player } = await params;
  const playerDetails = await getPlayerDetails(decodeURIComponent(player));

  const handleSubmitAction: SubmitHandler<FormData> = async (formData) => {
    'use server';

    try {
      await submitRankCalculator(formData);
    } catch (error) {
      Sentry.captureException(error);
    }
  };

  return (
    <FormWrapper
      formData={playerDetails}
      handleSubmitAction={handleSubmitAction}
    />
  );
}
