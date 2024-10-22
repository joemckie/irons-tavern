'use client';

import {
  Select as BaseSelect,
  Box,
  Button,
  Text,
  ThickCheckIcon,
} from '@radix-ui/themes';
import * as Ariakit from '@ariakit/react';
import { useController } from 'react-hook-form';

interface SelectProps extends BaseSelect.RootProps {
  name: string;
  placeholder?: string;
  options: string[];
}

export function Select({ options, placeholder, ...props }: SelectProps) {
  const { field } = useController({ name: props.name });

  return (
    <Ariakit.SelectProvider setValue={field.onChange} value={field.value}>
      <Button asChild variant="ghost" className="rt-SelectTrigger">
        <Ariakit.Select {...field} />
      </Button>
      <Ariakit.SelectPopover
        gutter={4}
        className="rt-PopoverContent rt-SelectContent rt-r-size-1"
        portal
        portalElement={document.getElementById('theme-root')}
      >
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
