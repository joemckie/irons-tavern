import { TextField } from '@radix-ui/themes';
import { forwardRef } from 'react';

export const Input = forwardRef<HTMLInputElement, TextField.RootProps>(
  ({ children, ...props }, forwardedRef) => (
    <TextField.Root {...props} ref={forwardedRef} role="textbox">
      {children}
    </TextField.Root>
  ),
);

Input.displayName = 'Input';
