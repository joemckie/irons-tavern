import { Theme, ThemePanel } from '@radix-ui/themes';
import { PropsWithChildren } from 'react';

export default function RankCalculatorLayout({ children }: PropsWithChildren) {
  return (
    <Theme accentColor="iris" appearance="dark">
      {children}
      <ThemePanel defaultOpen={false} />
    </Theme>
  );
}
