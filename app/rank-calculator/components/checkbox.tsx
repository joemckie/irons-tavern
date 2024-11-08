import {
  Checkbox as BaseCheckbox,
  CheckboxProps as BaseCheckboxProps,
} from '@radix-ui/themes';
import { forwardRef, startTransition, useState } from 'react';
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
  const [prevChecked, setPrevChecked] = useState(props.checked);

  if (props.checked !== prevChecked) {
    startTransition(() => {
      setPrevChecked(props.checked);
      field.onChange(props.checked);
    });
  }

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
