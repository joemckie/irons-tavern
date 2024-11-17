'use client';

import { FormProvider, useForm } from 'react-hook-form';
import { RankCalculator } from '../../[player]/rank-calculator';
import { RankCalculatorSchema } from '../../[player]/submit-rank-calculator-validation';
import { ViewSubmissionNavigationActions } from './components/view-submission-navigation-actions';

interface FormWrapperProps {
  formData: Omit<RankCalculatorSchema, 'rank' | 'points'>;
  userCanModerateSubmission: boolean;
}

export function ReadonlyFormWrapper({
  formData,
  userCanModerateSubmission,
}: FormWrapperProps) {
  const methods = useForm<Omit<RankCalculatorSchema, 'rank' | 'points'>>({
    disabled: true,
    values: formData,
  });

  return (
    <FormProvider {...methods}>
      <RankCalculator
        navigationActions={
          userCanModerateSubmission && (
            <ViewSubmissionNavigationActions
              rankStructure={formData.rankStructure}
            />
          )
        }
        submitRankCalculatorAction={() => {}}
      />
    </FormProvider>
  );
}
