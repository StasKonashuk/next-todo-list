import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ColorSchemeScript, mantineHtmlProps, MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { Notifications } from '@mantine/notifications';

import { mantineTheme } from 'theme';

import StoreProvider from './StoreProvider';
import WelcomeScreenGuard from './WelcomeScreenGuard';

import '@mantine/core/styles.css';
import '@mantine/notifications/styles.layer.css';
import '@mantine/dates/styles.css';
import 'public/styles/variables.css';
import './globals.css';

type RootLayoutProps = Readonly<{ children: React.ReactNode }>;

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Test Tasks List',
};

const RootLayout = ({ children }: RootLayoutProps) => (
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

export default RootLayout;
