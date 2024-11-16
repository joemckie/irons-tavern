'use client';

import { FormProvider, useForm } from 'react-hook-form';
import { RankCalculator } from '../../[player]/rank-calculator';
import { RankCalculatorSchema } from '../../[player]/submit-rank-calculator-validation';
import { ViewSubmissionNavigationActions } from '../../components/view-submission-navigation-actions';

interface FormWrapperProps {
  formData: Omit<RankCalculatorSchema, 'rank' | 'points'>;
  userHasManageRolesPermission: boolean;
}

export function ReadonlyFormWrapper({
  formData,
  userHasManageRolesPermission,
}: FormWrapperProps) {
  const methods = useForm<Omit<RankCalculatorSchema, 'rank' | 'points'>>({
    disabled: true,
    values: formData,
  });

  const isSubmissionApprovable =
    userHasManageRolesPermission && formData.rankStructure === 'Standard';

  return (
    <FormProvider {...methods}>
      <RankCalculator
        navigationActions={
          isSubmissionApprovable && <ViewSubmissionNavigationActions />
        }
        submitRankCalculatorAction={() => {}}
      />
    </FormProvider>
  );
}
