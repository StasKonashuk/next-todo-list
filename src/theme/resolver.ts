import { CSSVariablesResolver, MantineThemeOther } from '@mantine/core';

export const resolver: CSSVariablesResolver = (currentTheme) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const createVariables = (path: string, obj: Record<string, any>) => {
    const result: Record<string, string> = {};

    Object.entries(obj).forEach(([key, value]) => {
      const variableName = `${path}-${key}`;

      if (typeof value === 'object') {
        Object.assign(result, createVariables(variableName, value));
      } else {
        result[variableName] = value;
      }
    });

    return result;
  };

  const otherVariables = createVariables('--mantine-other', currentTheme.other as MantineThemeOther);

  return {
    variables: otherVariables,
    light: {},
    dark: {},
  };
};
