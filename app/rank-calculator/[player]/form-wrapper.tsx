'use client';

import { FormProvider } from 'react-hook-form';
import { useHookFormAction } from '@next-safe-action/adapter-react-hook-form/hooks';
import { zodResolver } from '@hookform/resolvers/zod';
import { Rank } from '@/config/enums';
import { RankCalculator } from './rank-calculator';
import { RankCalculatorSchema } from './submit-rank-calculator-validation';
import { RankCalculatorNavigationActions } from '../components/rank-calculator-navigation-actions';
import { Navigation } from '../components/navigation';
import { saveDraftRankSubmissionAction } from './actions/save-draft-rank-submission-action';
import { handleToastUpdates } from '../utils/handle-toast-updates';
import { CurrentPlayerProvider } from '../contexts/current-rank-context';

interface FormWrapperProps {
  formData: Omit<RankCalculatorSchema, 'rank' | 'points'>;
  currentRank?: Rank;
}

export function FormWrapper({ formData, currentRank }: FormWrapperProps) {
  const {
    form,
    action: {
      executeAsync: saveDraftRankSubmission,
      isExecuting,
      isTransitioning,
    },
  } = useHookFormAction(
    saveDraftRankSubmissionAction,
    zodResolver(RankCalculatorSchema),
    {
      formProps: {
        defaultValues: formData,
        criteriaMode: 'all',
        mode: 'onBlur',
      },
    },
  );

  const submitRankCalculator = form.handleSubmit(async (data) =>
    handleToastUpdates(saveDraftRankSubmission(data), {
      pending: 'Saving draft...',
      success: {
        render() {
          form.reset(data, {
            keepIsSubmitSuccessful: true,
          });

          return 'Draft saved!';
        },
      },
    }),
  );

  return (
    <CurrentPlayerProvider rank={currentRank} playerName={formData.playerName}>
      <FormProvider {...form}>
        <RankCalculator
          submitRankCalculatorAction={submitRankCalculator}
          navigation={
            <Navigation
              actions={
                <RankCalculatorNavigationActions
                  isActionActive={isExecuting || isTransitioning}
                />
              }
              shouldRenderBackButton
            />
          }
        />
      </FormProvider>
    </CurrentPlayerProvider>
  );
}
