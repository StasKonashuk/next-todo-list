import '@mantine/core/styles.layer.css';
import '@mantine/dates/styles.layer.css';
import '@mantine/notifications/styles.layer.css';
import '../public/styles/variables.css';

import { ReactNode } from 'react';

import { MantineProvider } from '@mantine/core';

import { mantineTheme, themeResolver } from '../src/theme/index.ts';

const ColorSchemeWrapper = ({ children }: { children: ReactNode }) => {
  return <>{children}</>;
};

export const decorators = [
  (renderStory: any) => <ColorSchemeWrapper>{renderStory()}</ColorSchemeWrapper>,
  (renderStory: any) => (
    <MantineProvider theme={mantineTheme} cssVariablesResolver={themeResolver}>
      {renderStory()}
    </MantineProvider>
  ),
];
