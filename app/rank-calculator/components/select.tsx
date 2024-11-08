import {
  Select as BaseSelect,
  Box,
  Button,
  Text,
  ThickCheckIcon,
} from '@radix-ui/themes';
import * as Ariakit from '@ariakit/react';
import { useController } from 'react-hook-form';
import { AriaAttributes, startTransition } from 'react';

interface SelectProps extends BaseSelect.RootProps, AriaAttributes {
  name: string;
  placeholder?: string;
  options: readonly string[];
}

export function Select({
  options,
  placeholder,
  required,
  ...props
}: SelectProps) {
  const { field } = useController({
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
      setValue={(value) =>
        startTransition(() => {
          field.onChange(value);
        })
      }
      value={field.value ?? ''}
    >
      <Button {...props} asChild variant="ghost" className="rt-SelectTrigger">
        <Ariakit.Select {...field}>
          {field.value}
          {!field.disabled && <Ariakit.SelectArrow />}
        </Ariakit.Select>
      </Button>
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
