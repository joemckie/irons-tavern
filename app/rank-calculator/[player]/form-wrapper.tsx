'use client';

import { FormProvider } from 'react-hook-form';
import { useHookFormAction } from '@next-safe-action/adapter-react-hook-form/hooks';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import { Rank } from '@/config/enums';
import { RankCalculator } from './rank-calculator';
import { RankCalculatorSchema } from './submit-rank-calculator-validation';
import { RankCalculatorNavigationActions } from '../components/rank-calculator-navigation-actions';
import { Navigation } from '../components/navigation';
import { saveDraftRankSubmissionAction } from './actions/save-draft-rank-submission-action';

interface FormWrapperProps {
  formData: Omit<RankCalculatorSchema, 'rank' | 'points'>;
  currentRank?: Rank;
}

export function FormWrapper({ formData, currentRank }: FormWrapperProps) {
  const { handleSubmitWithAction, form } = useHookFormAction(
    saveDraftRankSubmissionAction,
    zodResolver(RankCalculatorSchema),
    {
      actionProps: {
        onSuccess({ input }) {
          toast.success('Draft saved!');

          form.reset(input);
        },
        onError({ error: { serverError } }) {
          if (serverError) {
            toast.error(serverError);
          }
        },
      },
      formProps: {
        defaultValues: formData,
        criteriaMode: 'all',
        mode: 'onBlur',
      },
    },
  );

  return (
    <FormProvider {...form}>
      <RankCalculator
        submitRankCalculatorAction={handleSubmitWithAction}
        navigation={
          <Navigation
            actions={
              <RankCalculatorNavigationActions
                currentRank={currentRank}
                playerName={formData.playerName}
              />
            }
            shouldRenderBackButton
          />
        }
      />
    </FormProvider>
  );
}
