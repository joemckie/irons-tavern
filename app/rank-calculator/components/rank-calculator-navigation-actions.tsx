'use client';

import { Button } from '@radix-ui/themes';
import Link from 'next/link';
import { startTransition } from 'react';
import { useFormContext } from 'react-hook-form';
import { RankCalculatorSchema } from '../[player]/submit-rank-calculator-validation';

export function RankCalculatorNavigationActions() {
  const {
    reset,
    formState: { isValid, isSubmitting, isDirty },
  } = useFormContext<RankCalculatorSchema>();

  return (
    <>
      <Button asChild variant="outline" color="gray">
        <Link href="/rank-calculator">Back</Link>
      </Button>
      <Button
        variant="outline"
        color="gray"
        type="button"
        disabled={!isDirty}
        onClick={() => {
          startTransition(() => {
            reset();
          });
        }}
      >
        Reset
      </Button>
      <Button
        role="button"
        loading={isSubmitting}
        disabled={!isValid || isSubmitting}
        variant="surface"
      >
        Submit
      </Button>
    </>
  );
}
