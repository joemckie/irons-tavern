import { TextField } from '@radix-ui/themes';
import { forwardRef, ReactElement } from 'react';

interface InputProps extends TextField.RootProps {
  hasError: boolean;
  leftIcon?: ReactElement;
  rightIcon?: ReactElement;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ children, hasError, leftIcon, rightIcon, ...props }, forwardedRef) => (
    <TextField.Root
      {...props}
      ref={forwardedRef}
      role="textbox"
      color={hasError ? 'red' : undefined}
    >
      {leftIcon && <TextField.Slot>{leftIcon}</TextField.Slot>}
      {children}
      {rightIcon && <TextField.Slot>{rightIcon}</TextField.Slot>}
    </TextField.Root>
  ),
);

Input.displayName = 'Input';
