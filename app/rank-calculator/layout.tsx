import '@radix-ui/themes/styles.css';
import { PropsWithChildren } from 'react';
import { Theme } from '@radix-ui/themes';

export default async function RankCalculatorLayout({
  children,
}: PropsWithChildren) {
  return (
    <Theme
      accentColor="iris"
      appearance="dark"
      id="theme-root"
      panelBackground="solid"
      radius="small"
    >
      {children}
    </Theme>
  );
}
