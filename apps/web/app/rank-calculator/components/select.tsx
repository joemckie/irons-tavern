import {
  Select as BaseSelect,
  Box,
  Button,
  Text,
  ThickCheckIcon,
} from '@radix-ui/themes';
import * as Ariakit from '@ariakit/react';
import { FieldPath, FieldValues, useController } from 'react-hook-form';
import { AriaAttributes, startTransition } from 'react';
import { ValidationTooltip } from './validation-tooltip';

interface SelectProps<T extends FieldValues>
  extends BaseSelect.RootProps,
    AriaAttributes {
  name: FieldPath<T>;
  placeholder?: string;
  options: readonly string[];
  onValueChange?(this: void, value: string): void;
}

export function Select<T extends FieldValues>({
  options,
  placeholder,
  required,
  onValueChange,
  ...props
}: SelectProps<T>) {
  const {
    field,
    fieldState: { error },
  } = useController<T, FieldPath<T>>({
    name: props.name,
    rules: {
      required,
    },
  });

  const portalElement =
    typeof document !== 'undefined'
      ? document.getElementById('theme-root')
      : null;

  return (
    <Ariakit.SelectProvider
      setValue={(value) => {
        startTransition(() => {
          field.onChange(value);
          onValueChange?.(value);
        });
      }}
      value={field.value ?? ''}
    >
      <Ariakit.Select
        {...field}
        render={({ color, ...buttonProps }) => {
          if (field.disabled) {
            return (
              <ValidationTooltip error={error}>
                <Text size="2">{field.value}</Text>
              </ValidationTooltip>
            );
          }

          return (
            <Button
              {...buttonProps}
              {...props}
              variant="ghost"
              className="rt-SelectTrigger"
            >
              <Text
                color={error ? 'red' : undefined}
                weight={error ? 'medium' : undefined}
              >
                {field.value}
              </Text>
              <Ariakit.SelectArrow />
            </Button>
          );
        }}
      />
      <Ariakit.SelectPopover
        gutter={4}
        className="rt-PopoverContent rt-SelectContent rt-r-size-1"
        portal
        portalElement={portalElement}
      >
        {placeholder && (
          <Ariakit.SelectItem className="rt-SelectItem" disabled>
            <Text>{placeholder}</Text>
          </Ariakit.SelectItem>
        )}
        {options.map((option) => (
          <Ariakit.SelectItem
            key={option}
            className="rt-SelectItem"
            value={option}
          >
            <Ariakit.SelectItemCheck
              render={({ style, ...selectItemCheckProps }) =>
                field.value === option && (
                  <Box
                    {...selectItemCheckProps}
                    as="span"
                    className="rt-SelectItemIndicator"
                  >
                    <ThickCheckIcon className="rt-SelectItemIndicatorIcon" />
                  </Box>
                )
              }
            />
            <Text>{option}</Text>
          </Ariakit.SelectItem>
        ))}
      </Ariakit.SelectPopover>
    </Ariakit.SelectProvider>
  );
}
