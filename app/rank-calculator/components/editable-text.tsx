'use client';

import { useState } from 'react';
import { Flex, IconButton, Text, TextField } from '@radix-ui/themes';
import { CheckIcon, Pencil1Icon } from '@radix-ui/react-icons';
import { useController } from 'react-hook-form';

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
  const { field } = useController({
    name,
    rules: {
      required,
    },
  });

  if (isEditing) {
    return (
      <TextField.Root
        size="1"
        aria-label={ariaLabel}
        role="textbox"
        required={required}
        {...restProps}
        {...field}
        autoFocus
      >
        <TextField.Slot side="right">
          <IconButton
            size="1"
            variant="ghost"
            onClick={() => setIsEditing(false)}
          >
            <CheckIcon height="14" width="14" />
          </IconButton>
        </TextField.Slot>
      </TextField.Root>
    );
  }

  return (
    <Flex justify="center" gap="2" width="100%" align="center">
      <Text aria-label={ariaLabel} size="2">
        {field.value}
      </Text>
      <IconButton onClick={() => setIsEditing(true)} size="1" variant="ghost">
        <Pencil1Icon />
      </IconButton>
    </Flex>
  );
}
