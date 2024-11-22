import { Tooltip } from '@radix-ui/themes';
import { PropsWithChildren } from 'react';
import { FieldError } from 'react-hook-form';

interface ValidationTooltipProps {
  error: FieldError | undefined;
}

export function ValidationTooltip({
  error,
  children,
}: PropsWithChildren<ValidationTooltipProps>) {
  if (!error) {
    return children;
  }

  return <Tooltip content={error.message}>{children}</Tooltip>;
}
