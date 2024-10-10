import { Checkbox as BaseCheckbox } from '@radix-ui/themes';
import { ComponentProps, forwardRef } from 'react';
import { useController } from 'react-hook-form';

type CheckboxProps = {
  name: string;
} & Omit<ComponentProps<'button'>, 'ref'>;

export const Checkbox = forwardRef<HTMLButtonElement, CheckboxProps>(
  ({ name }, forwardedRef) => {
    const { field } = useController({ name });

    return (
      <BaseCheckbox
        onCheckedChange={field.onChange}
        name={name}
        checked={field.value}
        ref={forwardedRef}
      />
    );
  },
);
