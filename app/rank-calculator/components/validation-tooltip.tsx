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
      <Text asChild color="red" weight="medium" {...props}>
        {children}
      </Text>
    </Tooltip>
  );
}
