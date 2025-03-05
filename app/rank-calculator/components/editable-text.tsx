'use client';

import { startTransition, useState } from 'react';
import { Flex, IconButton, Text, TextField } from '@radix-ui/themes';
import { CheckIcon, Pencil1Icon } from '@radix-ui/react-icons';
import { useFormContext, useWatch } from 'react-hook-form';
import { Input } from './input';
import { ValidationTooltip } from './validation-tooltip';

interface EditableTextProps extends TextField.RootProps {
  name: string;
}

export function EditableText({
  name,
  'aria-label': ariaLabel,
  required,
  readOnly,
  ...restProps
}: EditableTextProps) {
  const [isEditing, setIsEditing] = useState(false);
  const { register, getFieldState } = useFormContext();
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
  const { error } = getFieldState(name);

  if (isEditing) {
    return (
      <Input
        hasError={!!error}
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
            type="button"
            size="1"
            variant="ghost"
            onClick={() => setIsEditing(false)}
          >
            <CheckIcon height="14" width="14" />
          </IconButton>
        }
        autoFocus
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            setIsEditing(false);
          }
        }}
      />
    );
  }

  return (
    <Flex justify="center" gap="2" width="100%" align="center">
      <ValidationTooltip error={error}>
        <Text aria-label={ariaLabel} size="2">
          {value}
        </Text>
      </ValidationTooltip>
      {!field.disabled && !readOnly && (
        <IconButton
          type="button"
          onClick={() => setIsEditing(true)}
          size="1"
          variant="ghost"
        >
          <Pencil1Icon />
        </IconButton>
      )}
    </Flex>
  );
}
