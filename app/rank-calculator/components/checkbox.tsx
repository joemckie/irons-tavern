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
  const { required, name, checked } = props;
  const { field } = useController({
    rules: {
      required,
    },
    name,
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
      onCheckedChange={(value) => {
        field.onChange(value);
      }}
    />
  );
}
