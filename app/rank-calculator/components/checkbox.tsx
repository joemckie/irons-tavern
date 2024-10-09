import { Checkbox } from '@radix-ui/themes';
import { ComponentProps, forwardRef } from 'react';
import { useController } from 'react-hook-form';

type CheckboxFieldProps = {
  name: string;
} & Omit<ComponentProps<'button'>, 'ref'>;

export const CheckboxField = forwardRef<HTMLButtonElement, CheckboxFieldProps>(
  ({ name }, forwardedRef) => {
    const { field } = useController({ name });

    return (
      <Checkbox
        onCheckedChange={field.onChange}
        name={name}
        checked={field.value}
        ref={forwardedRef}
      />
    );
  },
);
