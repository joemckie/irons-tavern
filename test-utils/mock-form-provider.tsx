import { FormData } from '@/types/rank-calculator';
import { PropsWithChildren, Suspense } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

export function MockFormProvider({
  children,
  defaultValues,
}: PropsWithChildren<{ defaultValues: Omit<FormData, 'rank' | 'points'> }>) {
  const form = useForm({
    defaultValues,
  });

  return (
    <FormProvider {...form}>
      <Suspense>{children}</Suspense>
    </FormProvider>
  );
}
