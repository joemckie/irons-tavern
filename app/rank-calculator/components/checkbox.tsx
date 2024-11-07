import { Checkbox as BaseCheckbox } from '@radix-ui/themes';
import { ComponentProps, forwardRef } from 'react';
import { FieldPath, FieldValues, useFormContext } from 'react-hook-form';
import { RankCalculatorSchema } from '../[player]/submit-rank-calculator-validation';

interface CheckboxProps<T extends FieldValues = FieldValues>
  extends Omit<ComponentProps<'button'>, 'ref' | 'color'> {
  name: FieldPath<T>;
}

export const Checkbox = forwardRef<
  HTMLButtonElement,
  CheckboxProps<RankCalculatorSchema>
>((props, forwardedRef) => {
  const { register, setValue } = useFormContext<RankCalculatorSchema>();
  const field = register(props.name);

  return (
    <BaseCheckbox
      {...props}
      {...field}
      onCheckedChange={(value) => {
        setValue(props.name, value);
      }}
      ref={forwardedRef}
    />
  );
});

Checkbox.displayName = 'Checkbox';
