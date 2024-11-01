import { TextField } from '@radix-ui/themes';
import { forwardRef } from 'react';

interface InputProps extends TextField.RootProps {
  hasError: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ children, hasError, ...props }, forwardedRef) => (
    <TextField.Root
      {...props}
      ref={forwardedRef}
      role="textbox"
      color={hasError ? 'red' : undefined}
    >
      {children}
    </TextField.Root>
  ),
);

Input.displayName = 'Input';
