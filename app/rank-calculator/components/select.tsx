import { Select as BaseSelect } from '@radix-ui/themes';
import { forwardRef } from 'react';
import { useController, useFormContext } from 'react-hook-form';

type SelectProps = {
  name: string;
  options: { label: string; value: string }[];
};

export const Select = forwardRef<HTMLButtonElement, SelectProps>(
  ({ options, ...props }, forwardedRef) => {
    const { field } = useController({ name: props.name });
    const { setValue } = useFormContext();

    return (
      <BaseSelect.Root
        {...props}
        onValueChange={(value) => {
          setValue(props.name, value);
        }}
        size="1"
        value={field.value}
      >
        <BaseSelect.Trigger ref={forwardedRef} placeholder="Select a diary" />
        <BaseSelect.Content>
          <BaseSelect.Group>
            {options.map((option) => (
              <BaseSelect.Item key={option.value} value={option.value}>
                {option.label}
              </BaseSelect.Item>
            ))}
          </BaseSelect.Group>
        </BaseSelect.Content>
      </BaseSelect.Root>
    );
  },
);

Select.displayName = 'Select';
