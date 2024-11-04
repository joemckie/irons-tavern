import '@radix-ui/themes/styles.css';
import { Theme } from '@radix-ui/themes';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import React from 'react';
import Providers from './providers';

if (process.env.NEXT_PUBLIC_API_MOCKING === 'enabled') {
  import('../mocks');
}

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Irons Tavern',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Theme
          accentColor="iris"
          appearance="dark"
          id="theme-root"
          panelBackground="solid"
          radius="small"
        >
          <Providers>{children}</Providers>
        </Theme>
      </body>
    </html>
  );
}
