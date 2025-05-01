import { Text, TextProps, Tooltip } from '@radix-ui/themes';
import { PropsWithChildren } from 'react';
import { FieldError } from 'react-hook-form';

type ValidationTooltipProps = {
  error: FieldError | undefined;
} & TextProps;

export function ValidationTooltip({
  error,
  children,
  ...props
}: PropsWithChildren<ValidationTooltipProps>) {
  if (!error) {
    return (
      <Text asChild {...props}>
        {children}
      </Text>
    );
  }

  return (
    <Tooltip content={error.message}>
      <Text asChild {...props} color="red" weight="medium">
        {children}
      </Text>
    </Tooltip>
  );
}
