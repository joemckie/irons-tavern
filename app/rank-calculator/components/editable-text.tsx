'use client';

import { startTransition, useState } from 'react';
import { Flex, IconButton, Text, TextField } from '@radix-ui/themes';
import { CheckIcon, Pencil1Icon } from '@radix-ui/react-icons';
import { useFormContext, useWatch } from 'react-hook-form';
import { Input } from './input';

interface EditableTextProps extends TextField.RootProps {
  name: string;
}

export function EditableText({
  name,
  'aria-label': ariaLabel,
  required,
  ...restProps
}: EditableTextProps) {
  const [isEditing, setIsEditing] = useState(false);
  const { register } = useFormContext();
  const value = useWatch({ name });
  const field = register(name, {
    required,
    setValueAs(newValue) {
      if (restProps.type === 'number') {
        return !newValue ? 0 : Number(newValue);
      }

      return newValue;
    },
  });

  if (isEditing) {
    return (
      <Input
        hasError={false}
        size="1"
        aria-label={ariaLabel}
        {...field}
        {...restProps}
        onChange={(e) => {
          startTransition(() => {
            field.onChange(e);
          });
        }}
        rightIcon={
          <IconButton
            size="1"
            variant="ghost"
            onClick={() => setIsEditing(false)}
          >
            <CheckIcon height="14" width="14" />
          </IconButton>
        }
        autoFocus
      />
    );
  }

  return (
    <Flex justify="center" gap="2" width="100%" align="center">
      <Text aria-label={ariaLabel} size="2">
        {value}
      </Text>
      {!field.disabled && (
        <IconButton onClick={() => setIsEditing(true)} size="1" variant="ghost">
          <Pencil1Icon />
        </IconButton>
      )}
    </Flex>
  );
}
