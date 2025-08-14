import type { Metadata } from 'next';
import { ColorSchemeScript, mantineHtmlProps, MantineProvider } from '@mantine/core';
import { Inter } from 'next/font/google';
import { Notifications } from '@mantine/notifications';
import { ModalsProvider } from '@mantine/modals';

import { mantineTheme } from 'theme';

import StoreProvider from './StoreProvider';

import '@mantine/core/styles.css';
import '@mantine/notifications/styles.layer.css';
import '@mantine/dates/styles.css';
import 'public/styles/variables.css';

import './globals.css';
import WelcomeScreenGuard from './WelcomeScreenGuard';

type RootLayoutProps = Readonly<{ children: React.ReactNode }>;

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Test Tasks List',
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <StoreProvider>
      <html lang="en" {...mantineHtmlProps}>
        <head>
          <ColorSchemeScript />

          <link rel="shortcut icon" href="public/favicon.svg" />

          <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no" />
        </head>

        <body suppressHydrationWarning className={`${inter.variable} antialiased`}>
          <MantineProvider theme={mantineTheme}>
            <Notifications autoClose={10000} position="bottom-left" />

            <ModalsProvider>
              <WelcomeScreenGuard>{children}</WelcomeScreenGuard>
            </ModalsProvider>
          </MantineProvider>
        </body>
      </html>
    </StoreProvider>
  );
}
