import { Text } from '@radix-ui/themes';
import { Message } from 'react-hook-form';

interface ValidationErrorProps {
  message: Message;
}

export function ValidationError({ message }: ValidationErrorProps) {
  return (
    <Text as="p" color="red" size="2">
      {message}
    </Text>
  );
}
