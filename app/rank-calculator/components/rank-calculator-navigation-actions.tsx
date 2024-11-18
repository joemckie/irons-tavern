'use client';

import {
  Button,
  ChevronDownIcon,
  DropdownMenu,
  Flex,
  IconButton,
} from '@radix-ui/themes';
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
          {isDirty ? 'Save' : 'Submit'}
        </Button>
        <DropdownMenu.Root modal={false}>
          <DropdownMenu.Trigger>
            <IconButton
              variant="soft"
              type="button"
              style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
            >
              <ChevronDownIcon />
            </IconButton>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content
            style={{ borderTopRightRadius: 0 }}
            variant="soft"
          >
            <DropdownMenu.Item>Save and submit</DropdownMenu.Item>
            <DropdownMenu.Separator />
            <DropdownMenu.Item color="red">
              Reset account data
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      </Flex>
    </>
  );
}
