import { RankCalculatorSchema } from '@/app/rank-calculator/[player]/submit-rank-calculator-validation';
import { PropsWithChildren, Suspense } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

export function MockFormProvider({
  children,
  defaultValues,
}: PropsWithChildren<{
  defaultValues: Omit<RankCalculatorSchema, 'rank' | 'points'>;
}>) {
  const form = useForm({
    defaultValues,
  });

  return (
    <FormProvider {...form}>
      <Suspense>{children}</Suspense>
    </FormProvider>
  );
}
