'use client';

import { useState } from 'react';
import { Flex, IconButton, Text, TextField } from '@radix-ui/themes';
import { CheckIcon, Pencil1Icon } from '@radix-ui/react-icons';
import { useController } from 'react-hook-form';

interface EditableTextProps extends TextField.RootProps {
  name: string;
}

export function EditableText({ name, ...restProps }: EditableTextProps) {
  const [editing, setEditing] = useState(false);
  const { field } = useController({ name });

  if (editing) {
    return (
      <TextField.Root size="1" {...restProps} {...field} autoFocus>
        <TextField.Slot side="right">
          <IconButton
            size="1"
            variant="ghost"
            onClick={() => setEditing(false)}
          >
            <CheckIcon height="14" width="14" />
          </IconButton>
        </TextField.Slot>
      </TextField.Root>
    );
  }

  return (
    <Flex justify="center" gap="2" width="100%" align="center">
      <Text size="2">{field.value}</Text>
      <IconButton onClick={() => setEditing(true)} size="1" variant="ghost">
        <Pencil1Icon />
      </IconButton>
    </Flex>
  );
}
