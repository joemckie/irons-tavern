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

  return (
    <FormProvider {...form}>
      <RankCalculator
        submitRankCalculatorAction={(e) => {
          e.preventDefault();

          const values = form.getValues();

          handleToastUpdates(saveDraftRankSubmission(values), {
            pending: 'Saving draft...',
            success: {
              render() {
                form.reset(form.getValues(), {
                  keepIsSubmitSuccessful: true,
                });
                
                return 'Draft saved!';
              },
            },
          });
        }}
        navigation={
          <Navigation
            actions={
              <RankCalculatorNavigationActions
                currentRank={currentRank}
                playerName={formData.playerName}
                disableSubmit={isExecuting || isTransitioning}
              />
            }
            shouldRenderBackButton
          />
        }
      />
    </FormProvider>
  );
}
