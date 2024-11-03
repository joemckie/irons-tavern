import { Checkbox as BaseCheckbox } from '@radix-ui/themes';
import { ComponentProps, forwardRef } from 'react';
import { useController } from 'react-hook-form';

type CheckboxProps = {
  name: string;
} & Omit<ComponentProps<'button'>, 'ref' | 'color'>;

export const Checkbox = forwardRef<HTMLButtonElement, CheckboxProps>(
  (props, forwardedRef) => {
    const { field } = useController({ name: props.name });

    return (
      <BaseCheckbox
        {...props}
        {...field}
        onCheckedChange={field.onChange}
        checked={field.value}
        ref={forwardedRef}
      />
    );
  },
);

Checkbox.displayName = 'Checkbox';
