import {
  Checkbox as BaseCheckbox,
  CheckboxProps as BaseCheckboxProps,
} from '@radix-ui/themes';
import { useEffect } from 'react';
import { FieldPath, FieldValues, useController } from 'react-hook-form';

interface CheckboxProps<T extends FieldValues = FieldValues>
  extends Omit<BaseCheckboxProps, 'ref' | 'color'> {
  name: FieldPath<T>;
}

export function Checkbox(props: CheckboxProps) {
  const { required, name, checked, disabled } = props;
  const { field } = useController({
    rules: {
      required,
    },
    name,
    disabled,
    defaultValue: checked,
  });

  useEffect(() => {
    if (field.value !== checked) {
      field.onChange(checked);
    }
  }, [field, checked]);

  return (
    <BaseCheckbox
      {...props}
      {...field}
      disabled={disabled}
      onCheckedChange={(value) => {
        field.onChange(value);
      }}
    />
  );
}
