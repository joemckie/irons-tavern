import { TextField } from '@radix-ui/themes';
import { forwardRef, ReactElement } from 'react';
import { disableEnterSubmission } from '../utils/disable-enter-submission';

interface InputProps extends TextField.RootProps {
  hasError: boolean;
  leftIcon?: ReactElement;
  rightIcon?: ReactElement;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ hasError, leftIcon, rightIcon, ...props }, forwardedRef) => (
    <TextField.Root
      {...props}
      onKeyDown={(e) => {
        disableEnterSubmission(e);
        props.onKeyDown?.(e);
      }}
      ref={forwardedRef}
      role="textbox"
      color={hasError ? 'red' : undefined}
    >
      {leftIcon && <TextField.Slot side="left">{leftIcon}</TextField.Slot>}
      {rightIcon && <TextField.Slot side="right">{rightIcon}</TextField.Slot>}
    </TextField.Root>
  ),
);

Input.displayName = 'Input';
