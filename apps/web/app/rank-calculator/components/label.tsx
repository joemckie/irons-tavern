import { Text, TextProps } from '@radix-ui/themes';
import { forwardRef } from 'react';

export const Label = forwardRef<HTMLLabelElement, TextProps>((props, ref) => (
  <Text as="label" {...props} ref={ref} />
));

Label.displayName = 'Label';
