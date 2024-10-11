import { Theme, ThemePanel } from '@radix-ui/themes';
import { PropsWithChildren } from 'react';

export default function RankCalculatorLayout({ children }: PropsWithChildren) {
  return (
    <Theme
      accentColor="iris"
      appearance="dark"
      panelBackground="solid"
      scaling="95%"
    >
      {children}
      <ThemePanel defaultOpen={false} />
    </Theme>
  );
}
