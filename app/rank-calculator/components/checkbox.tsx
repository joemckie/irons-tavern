import {
  Checkbox as BaseCheckbox,
  CheckboxProps as BaseCheckboxProps,
} from '@radix-ui/themes';
import { forwardRef, startTransition, useEffect } from 'react';
import {
  FieldPath,
  FieldValues,
  useController,
  useFormContext,
} from 'react-hook-form';
import { RankCalculatorSchema } from '../[player]/submit-rank-calculator-validation';

interface CheckboxProps<T extends FieldValues = FieldValues>
  extends Omit<BaseCheckboxProps, 'ref' | 'color'> {
  name: FieldPath<T>;
}

export const Checkbox = forwardRef<
  HTMLButtonElement,
  CheckboxProps<RankCalculatorSchema>
>((props, forwardedRef) => {
  const { setValue } = useFormContext<RankCalculatorSchema>();
  const { field } = useController({
    rules: {
      required: props.required,
    },
    name: props.name,
  });

  useEffect(() => {
    startTransition(() => {
      setValue(props.name, props.checked);
    });
  }, [props.name, props.checked, setValue]);

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
