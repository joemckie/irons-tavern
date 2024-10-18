import { Select as BaseSelect } from '@radix-ui/themes';
import { forwardRef } from 'react';
import { useController, useFormContext } from 'react-hook-form';

interface SelectProps extends BaseSelect.RootProps {
  name: string;
  placeholder?: string;
  options: { label: string; value: string }[];
}

export const Select = forwardRef<HTMLButtonElement, SelectProps>(
  ({ options, placeholder, ...props }, forwardedRef) => {
    const { field } = useController({ name: props.name });
    const { setValue } = useFormContext();

    return (
      <BaseSelect.Root
        {...props}
        onValueChange={(value) => {
          setValue(props.name, value);
        }}
        value={field.value}
      >
        <BaseSelect.Trigger ref={forwardedRef} placeholder={placeholder} />
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
