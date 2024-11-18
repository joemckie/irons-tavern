'use client';

import { Button, ChevronDownIcon, Flex, IconButton } from '@radix-ui/themes';
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
      <Flex gap="1px">
        <Button
          role="button"
          loading={isSubmitting}
          disabled={!isValid || isSubmitting}
          variant="soft"
          style={{ borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
        >
          Save
        </Button>
        <IconButton
          variant="soft"
          type="button"
          style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
        >
          <ChevronDownIcon />
        </IconButton>
      </Flex>
    </>
  );
}
