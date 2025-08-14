'use client';

import { createTheme } from '@mantine/core';

import * as components from './components';

export const mantineTheme = createTheme({
  components,
});

export { resolver as themeResolver } from './resolver';
