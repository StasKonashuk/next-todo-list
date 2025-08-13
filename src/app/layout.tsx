import type { Metadata } from 'next';
import { ColorSchemeScript, mantineHtmlProps, MantineProvider } from '@mantine/core';
import { Inter } from 'next/font/google';

import { mantineTheme } from 'theme';

import StoreProvider from './StoreProvider';

import '@mantine/core/styles.css';
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
          <MantineProvider theme={mantineTheme}>{children}</MantineProvider>
        </body>
      </html>
    </StoreProvider>
  );
}
