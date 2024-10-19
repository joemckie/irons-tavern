'use client';

import '@radix-ui/themes/styles.css';
import { PropsWithChildren, Suspense } from 'react';
import { Theme, ThemePanel } from '@radix-ui/themes';

export default function RankCalculatorLayout({ children }: PropsWithChildren) {
  return (
    <Theme accentColor="iris" appearance="dark">
      <Suspense>{children}</Suspense>
      <ThemePanel defaultOpen={false} />
    </Theme>
  );
}
