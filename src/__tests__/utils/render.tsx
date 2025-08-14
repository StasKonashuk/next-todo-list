import React, { ReactElement, ReactNode, useRef } from 'react';
import { MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { render, RenderOptions } from '@testing-library/react';
import WelcomeScreenGuard from 'app/WelcomeScreenGuard';
import makeStore, { AppStore } from 'lib/store';
import { Provider } from 'react-redux';

import { mantineTheme } from 'theme';

interface StoreProviderProps {
  children: ReactNode;
  preloadedState?: Partial<ReturnType<AppStore['getState']>>;
}

interface AllTheProvidersProps {
  children: ReactNode;
  preloadedState?: Partial<ReturnType<AppStore['getState']>>;
}

const StoreProvider = ({ children, preloadedState }: StoreProviderProps) => {
  const storeRef = useRef<AppStore>(undefined);

  if (!storeRef.current) {
    storeRef.current = makeStore(preloadedState);
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
};

export default StoreProvider;

const AllTheProviders = ({ children, preloadedState }: AllTheProvidersProps) => (
  <StoreProvider preloadedState={preloadedState}>
    <MantineProvider theme={mantineTheme}>
      <ModalsProvider>
        <WelcomeScreenGuard>{children}</WelcomeScreenGuard>
      </ModalsProvider>
    </MantineProvider>
  </StoreProvider>
);

const customRender = (
  ui: ReactElement,
  preloadedState?: Partial<ReturnType<AppStore['getState']>>,
  options?: Omit<RenderOptions, 'wrapper'>,
) =>
  render(ui, {
    wrapper: ({ children }) => <AllTheProviders preloadedState={preloadedState}>{children}</AllTheProviders>,
    ...options,
  });

export * from '@testing-library/react';

export { customRender as render };
