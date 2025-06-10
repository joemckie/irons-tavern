import '@radix-ui/themes/styles.css';
import 'react-toastify/dist/ReactToastify.css';
import './globals.css';
import { Theme } from '@radix-ui/themes';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ToastContainer } from 'react-toastify';
import { SpeedInsights } from '@vercel/speed-insights/next';
import Providers from './providers';

if (process.env.NEXT_PUBLIC_API_MOCKING === 'enabled') {
  await import('../mocks');
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
      <body className={inter.className} suppressHydrationWarning>
        <SpeedInsights />
        <Theme
          accentColor="iris"
          appearance="dark"
          id="theme-root"
          panelBackground="solid"
          radius="small"
        >
          <Providers>{children}</Providers>
          <ToastContainer
            theme="dark"
            pauseOnHover
            pauseOnFocusLoss
            bodyClassName="rt-Text rt-r-size-2"
            autoClose={8000}
            position="top-center"
          />
        </Theme>
      </body>
    </html>
  );
}
